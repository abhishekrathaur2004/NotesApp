import express from "express";
import {
  createNotes,
  getSingleNote,
  getAllNotes,
  deleteNote,
  updateNotes,
  getEditSingleNote,
} from "../controllers/noteControllers.js";
const Router = express.Router();


// getting all notes on /notes as well as handelling post
Router.route("/").get(getAllNotes).post(createNotes);

// returning the note addition page
Router.get("/create", (req, res) => {
  return res.render("notes/create");
});

// handling request for editing note
Router.get("/edit/:noteid", getEditSingleNote);

// get delete update single note
Router.route("/:noteid").get(getSingleNote).delete(deleteNote).put(updateNotes);

export default Router;
