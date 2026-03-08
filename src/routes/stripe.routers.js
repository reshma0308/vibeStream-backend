import { Router } from "express";
import { createCheckoutSession } from "../controllers/stripe.controllers.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-checkout-session").post(verifyJwt, createCheckoutSession);

export default router;
