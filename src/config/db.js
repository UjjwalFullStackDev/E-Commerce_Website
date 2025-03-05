import mongoose from "mongoose";

const connectDB = async (req, res) => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        if(!conn) 
            console.log("Missing connection string");
        console.log("DB Connected");
        
    } catch (error) {
        return console.log(error);
    }
}

export default connectDB;