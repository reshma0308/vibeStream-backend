import mongoose from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },

  videoFile: {
    url: {
      type: String,
      required: true
    },
    public_id: {
      type: String,
      required: true
    }
  },

  thumbnail: {
    url: {
      type: String,
      required: true
    },
    public_id: {
      type: String,
      required: true
    }
  },

  duration: {
    type: Number,
    default: 0
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  views: {
    type: Number,
    default: 0
  },

  isPublished: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });
videoSchema.plugin(aggregatePaginate);

export const Video = mongoose.model("Video", videoSchema);