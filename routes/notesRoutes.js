import express from "express";
import { createNotes, getAllNotes ,deleteNote,updateNotes,getSingleNote} from "../controllers/noteControllers.js";
const Router = express.Router();

Router.route('/')
.get(getAllNotes)
.post(createNotes)

Router.get('/create',(req,res)=>{
    // console.log('create krne')
    return res.render('notes/create')
})

Router.route('/:noteid')
.get(getSingleNote)
.delete(deleteNote)
.put(updateNotes)


export default Router;