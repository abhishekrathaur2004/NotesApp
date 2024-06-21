import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            console.log(`MongoDb connected Successfully.`)
        })
        .catch((err)=>{
            console.log(`Error in connecting DB : ${err}`);
        })
    } catch (error) {
        console.log(`Error in connecting DB : ${error}`);
    }
}

export default connectDB;