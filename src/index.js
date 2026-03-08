import mongoose from "mongoose"
import dotenv from "dotenv";

dotenv.config({
    path: './.env'
})
import connectDB from "./db/index.js";
import app from "./app.js";





connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`server is running on port : ${process.env.PORT}`)
        })
        // TO LISTEN ERRORS ON THE APP.
        app.on("error", (error) => {
            console.log("ERRR::", error);
            throw error;
        })
    })
    .catch((err) => {
        console.log('Mongo db connection failed!!!', err)
    })

