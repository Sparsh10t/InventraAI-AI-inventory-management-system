import mongoose from "mongoose";                     // Mongoose import kiya (MongoDB connect karne ke liye)

import { DB_NAME } from "../constants.js";            // Database ka naam constants file se liya

const connectDB = async ()=>{                         // Async function banaya DB connect karne ke liye
    try{                                              // Try block (error handle karne ke liye)

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`) 
                                                     // MongoDB ko env URL + DB_NAME se connect kiya

        console.log(`\n MongoDB connected !! DB Host: ${connectionInstance.connection.host}`); 
                                                     // Successful connection ka message print kiya
        console.log("MongoDB connected:");
console.log("DB Name:", connectionInstance.connection.name);
console.log("Host:", connectionInstance.connection.host);

    }
    catch(error){                                    // Agar connection fail ho jaye

        console.log("error",error)                   // Error ko console me print kiya

        process.exit(1)                              // App ko forcefully band kar diya (fail hone par)

    }
}

export default connectDB                             // Function export kiya taaki dusri file me use ho
