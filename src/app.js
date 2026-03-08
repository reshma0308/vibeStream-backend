import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


import stripeWebhookRouter from "./routes/webhook.routers.js";

// Stripe webhook requires raw body. We must apply express.raw here *before* express.json
// and specifically for this route.
app.use(
    "/api/v1/stripe/webhook",
    express.raw({ type: 'application/json' }),
    stripeWebhookRouter
);

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())


//routes

import userRouter from "./routes/user.routers.js"
import subscriptionRouter from "./routes/subscription.routers.js";
import videoRouter from "./routes/video.routers.js";
import commentRouter from "./routes/comment.routers.js";
import likeRouter from "./routes/like.routers.js";
import stripeRouter from "./routes/stripe.routers.js";

app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/users", userRouter)
app.use("/api/v1/stripe", stripeRouter)

export default app 