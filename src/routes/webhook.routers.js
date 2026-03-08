import express, { Router } from "express";
import { handleStripeWebhook } from "../controllers/stripe.controllers.js";

const router = Router();

// Webhook requires raw body (already parsed in app.js)
router.post("/", handleStripeWebhook);

export default router;
