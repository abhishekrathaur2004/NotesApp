import mongoose from "mongoose";

// Defining the user Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim : true,
    },
    password: {
        type: String,
        required: true,
    
    }
});

// Create the User model
const User = mongoose.model('User', userSchema);


export default User;