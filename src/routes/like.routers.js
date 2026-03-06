import { Router } from "express";
import {
    toggleVideoLike,
    getLikedVideos
} from "../controllers/like.controllers.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJwt); // Apply verifyJWT middleware to all routes in this file

router.route("/videos").get(getLikedVideos);
router.route("/toggle/v/:videoId").post(toggleVideoLike);

export default router;
