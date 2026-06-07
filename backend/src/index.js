import dotenv from "dotenv"                      // dotenv import kiya (env file load karne ke liye)

dotenv.config({                                 // .env file ko load kar rahe hain
    path: './.env'                               // Env file ka path bataya
})

import mongoose from "mongoose";                 // Mongoose import kiya (MongoDB connect karne ke liye)

import { DB_NAME } from "./constants.js";         // Database ka naam constants file se liya

import connectDB from "./db/index.js";            // DB connect karne wala function import kiya

import { app } from "./app.js";                  // Express app import kiya (warna app undefined hota)


connectDB()                                     // Database connect karne ka function call kiya
.then(()=>{                                     // Jab DB successfully connect ho jaye

    app.on("error", (error)=>{                  // Agar server me koi error aaye
            console.log("error")                // Console me error print karega
            throw error                         // Error ko throw karega (err ki jagah error)
        })

    app.listen(process.env.PORT || 8000, ()=>{  // Server start karega given port par
        console.log(`server is running at ${process.env.PORT}`); // Server running message
    })

})
.catch((err)=>{                                // Agar DB connect na ho paye
    console.log("mongo db connection failed",err) // Error print karega
})

