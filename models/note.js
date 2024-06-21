import mongoose from "mongoose";

// Defining the note Schema
const noteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // referencing the userid who is the owner of note
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now() 
    }
});

// Create the Note model
const Note = mongoose.model('Note', noteSchema);

export default Note;