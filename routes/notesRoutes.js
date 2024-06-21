import express from "express";
import { createNotes,getSingleNote, getAllNotes ,deleteNote,updateNotes, getEditSingleNote} from "../controllers/noteControllers.js";
const Router = express.Router();

Router.route('/')
.get(getAllNotes)
.post(createNotes)

Router.get('/create',(req,res)=>{
 
    return res.render('notes/create')
})

Router.get('/edit/:noteid', getEditSingleNote)
Router.route('/:noteid')
.get(getSingleNote)
.delete(deleteNote)
.put(updateNotes)


export default Router;