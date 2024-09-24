import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        //MongoDB'ye bağlanmak için .env içinden MONGO_URI çekilir.
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};