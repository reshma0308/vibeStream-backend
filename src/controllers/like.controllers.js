import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiErrors.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params;
    
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const likeExists = await Like.findOne({
        video: videoId,
        likedBy: req.user._id
    });

    if (likeExists) {
        await Like.findByIdAndDelete(likeExists._id);
        return res.status(200).json(new ApiResponse(200, { isLiked: false }, "Like removed"));
    } else {
        await Like.create({
            video: videoId,
            likedBy: req.user._id
        });
        return res.status(200).json(new ApiResponse(200, { isLiked: true }, "Like added"));
    }
});

const getLikedVideos = asyncHandler(async (req, res) => {
    const likedVideosAggregate = await Like.aggregate([
        {
            $match: {
                likedBy: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "video",
                foreignField: "_id",
                as: "likedVideo",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "ownerDetails",
                        }
                    },
                    {
                        $unwind: "$ownerDetails",
                    }
                ]
            }
        },
        {
            $unwind: "$likedVideo"
        },
        {
            $replaceRoot: { newRoot: "$likedVideo" }
        }
    ]);

    return res.status(200).json(new ApiResponse(200, likedVideosAggregate, "Liked videos fetched successfully"));
});

// Optionally expand this later with toggleCommentLike, toggleTweetLike, etc.
export {
    toggleVideoLike,
    getLikedVideos
};
