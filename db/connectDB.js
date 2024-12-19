import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`mongodb+srv://abhishektiwari03929:47yj175mS68ScGy9@smarteducation.ybwab.mongodb.net/weatherApp`);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}   