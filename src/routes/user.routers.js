import {Router} from "express"
import { loginUser, logoutUser, registerUser, getUserProfileById,refreshAccessToken } from "../controllers/user.controllers.js"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJwt } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/:id").get(verifyJwt, getUserProfileById)

router.route("/register").post(
    upload.fields([
        {
            name :"avatar",
            maxCount :1
        },{
            name :"coverImage",
            maxCount:1
        }

    ]),
    registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJwt ,logoutUser)
router.route("/refresh-token").post(refreshAccessToken)

export default router