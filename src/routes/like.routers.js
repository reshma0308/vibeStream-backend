import { Router } from "express";
import {
    toggleVideoLike,
    getLikedVideos
} from "../controllers/like.controllers.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJwt); 

router.route("/videos").get(getLikedVideos);
router.route("/toggle/v/:videoId").post(toggleVideoLike);

export default router;
