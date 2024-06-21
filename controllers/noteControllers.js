import Note from "../models/note.js";

// get all notes
const getAllNotes = async (req, res) => {
  const userId = req.user._id;
  try {
    const notes = await Note.find({ userId: userId });
    res.render("notes/index", {
      notes: notes,
      user_email: req.user.email,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      ok: false,
      error: "Error retrieving notes",
    });
  }
};

// get single note and redirect it to view single note
const getSingleNote = async (req, res) => {
  const noteId = req.params.noteid;
  const user = req.user;

  try {
    if (!noteId) {
      return res.status(400).json({
        ok: false,
        success: false,
        message: "NoteId Missing",
      });
    }

    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({
        ok: false,
        success: false,
        message: "Note not found at this id",
      });
    }

    // checking if the authorised user is trying to access or not
    if (note.userId.toString() !== user._id.toString()) {
      return res.status(403).json({
        ok: false,
        success: false,
        message: "Unauthorised user cannot acess this note",
      });
    }

    return res.render(`notes/note`, {
      note: note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      ok: false,
      message: "Error finding cookie",
      error,
    });
  }
};

// handling edit single note request
const getEditSingleNote = async (req, res) => {
  const noteId = req.params.noteid;
  const user = req.user;

  try {
    if (!noteId) {
      return res.status(400).json({
        ok: false,
        success: false,
        message: "NoteId Missing",
      });
    }

    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({
        ok: false,
        success: false,
        message: "Note not found at this id",
      });
    }

    if (note.userId.toString() !== user._id.toString()) {
      return res.status(403).json({
        ok: false,
        success: false,
        message: "Unauthorised user cannot acess this note",
      });
    }

    return res.render(`notes/edit`, {
      note: note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      ok: false,
      message: "Error finding cookie",
      error,
    });
  }
};

// creating notes
const createNotes = async (req, res) => {
  const { title, content } = req.body;
  const user = req.user;

  if (!title.trim() || !content.trim()) {
    return res.render("notes/create", {
      message: "Title or Content missing",
    });
  }

  try {
    const newNotes = new Note({
      userId: user._id,
      title: title,
      content: content,
      createdAt: Date.now(),
    });
    await newNotes.save();

    return res.render("notes/create", {
      message: "New Note Created Successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      ok: false,
      message: "Error creating notes",
      error,
    });
  }
};

// deletenote
const deleteNote = async (req, res) => {
  const noteId = req.params.noteid;
  const user = req.user;

  try {
    if (!noteId) {
      return res.status(400).json({
        ok: false,
        success: false,
        message: "NoteId Missing",
      });
    }

    // Check if the note exists and belongs to the user
    const note = await Note.findByIdAndDelete({
      _id: noteId,
      userId: user._id,
    });
    if (!note) {
      return res.json({
        ok: false,
        success: false,
        message: "Unauthorized cannot delete it",
      });
    }
    await Note.deleteOne({ _id: noteId });
    return res.status(200).json({
      ok: true,
      success: true,
      message: "Note deleted successfully.",
    });
  } catch (error) {
    console.log("ede", error);
    res.status(500).json({
      success: false,
      ok: false,
      message: "Error Deleting notes",
      error,
    });
  }
};
const updateNotes = async (req, res) => {
  const noteId = req.params.noteid;
  const user = req.user;

  const { title, content } = req.body;
  try {
    if (!noteId) {
      return res.status(400).json({
        ok: false,
        success: false,
        message: "NoteId Missing",
      });
    }
    if (!title.trim() || !content.trim()) {
      return res.status(400).json({
        ok: false,
        success: false,
        message: "Title or content missing",
      });
    }
    const note = await Note.findByIdAndUpdate({ _id: noteId, userId: user._id },{
      title: title,
      content:content
    });
    if(!note){
      return res.status(404).json({
        ok: false,
        success:false,
        message:'Unauthorised user cannot access it.'
      })
    }
    return res.status(200).json({
      ok: true,
      success:true,
      message:'Note updated successfully'
    })
  } catch (error) {
    return res.status(500).json({
      message: "Internall servr error",
      error: error,
    });
  }
};
export {
  getAllNotes,
  createNotes,
  deleteNote,
  updateNotes,
  getSingleNote,
  getEditSingleNote,
};
