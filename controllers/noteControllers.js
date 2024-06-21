import Note from "../models/note.js";

const getAllNotes = async (req, res) => {
  const userId = req.user._id;

  try {
    const notes = await Note.find({ userId: userId });
    res.render("notes/index", {
      notes: notes,
      user_email: req.user.email 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      ok: false,
      error: "Error retrieving notes",
    });
  }
};
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
    // console.log('----',note kuc der k liue);
    
    if (note.userId.toString() !== user._id.toString()) {
      
      return res.status(403).json({
        ok: false,
        success: false,
        message: "Unauthorised user cannot acess this note",
      });
    }
      // }
      
      // return res.status(200).json({
      //     ok : true,
      //     success : true,
      //     message: "Note deleted successfully.",
      //     note : note
      // })
      
      return res.render(`notes/edit`, {
        note: note,
      });
    }
   catch (error) {
    res.status(500).json({
      success: false,
      ok: false,
      message: "Error finding cookie",
      error,
    });
  }
};
const createNotes = async (req, res) => {
  const { title, content } = req.body;
  const user = req.user;
  // console.log(user);
  
  if (!title.trim() || !content.trim()) {
    // return res.status(400).json({
    //   success: false,
    //   ok: false,
    //   error: "Input fields missing",
    // });
    return  res.render('notes/create', {
      message: "Title or Content missing"
    })
  }

  try {
    const newNotes = new Note({
      userId: user._id,
      title: title,
      content: content,
      createdAt: Date.now(),
    });
    await newNotes.save();
    // res.status(201).json({
    //   success: true,
    //   ok: true,
    //   message: "New notes created successfully!",
    //   notes: newNotes,
    // });
    return res.render('notes/create', {
      message: "New Note Created Successfully."
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      ok: false,
      message: "Error creating notes",
      error,
    });
  }
};

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
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({
        ok: false,
        success: false,
        message: "Note not found at this id",
      });
    }
    // console.log('----',note);
    if (note.userId.toString() !== user._id.toString()) {
      return res.status(403).json({
        ok: false,
        success: false,
        message: "Unauthorised user cannot delete this note",
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
  // console.log(noteId);
  const { title, content } = req.body;
  try {
    if (!noteId) {
      return res.status(400).json({
        ok: false,
        success: false,
        message: "NoteId Missing",
      });
    }
    if(!title.trim() || !content.trim()){
      return res.status(400).json({
        ok: false,
        success: false,
        message: "Title or content missing",
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
    if(note.userId.toString() !== user._id.toString()){
        return res.status(403).json({
            ok : false,
            success : false,
            message: "Unauthorised user cannot update this note"
        })
    }
    // Update the note fields
    note.title = title ;
    note.content = content ;

    // Save the updated note
    const updatedNote = await note.save();

    return res.status(200).json({
      ok: true,
      success: true,
      message: "Notes updated successfully.",
      data: updatedNote,
    });
    // return res.redirect('notes/index')
  } catch (error) {}
};
export { getAllNotes, createNotes, deleteNote, updateNotes, getSingleNote };
