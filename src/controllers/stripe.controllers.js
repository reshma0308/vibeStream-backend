import Stripe from "stripe";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";




const createCheckoutSession = asyncHandler(async (req, res) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const userId = req.user?._id;

    if (!userId) {
        throw new ApiError(401, "Unauthorized request");
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: 'Channel Membership',
                        description: 'Join Channel Membership',
                    },
                    unit_amount: 50000,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.CORS_ORIGIN || 'http://localhost:8080'}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CORS_ORIGIN || 'http://localhost:8080'}`,
        client_reference_id: userId.toString(),
    });

    return res.status(200).json(
        new ApiResponse(200, { sessionId: session.id, url: session.url }, "Stripe Checkout session created")
    )
})

const handleStripeWebhook = asyncHandler(async (req, res) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error("Webhook Error:", err.message);
        throw new ApiError(400, `Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const userId = session.client_reference_id;
        const customerId = session.customer;

        if (userId) {
            await User.findByIdAndUpdate(userId, {
                isChannelMember: true,
                stripeCustomerId: customerId,
            });
            console.log(`User ${userId} membership updated successfully.`);
        }
    }

    return res.status(200).send("Webhook received");
})

export { createCheckoutSession, handleStripeWebhook };
