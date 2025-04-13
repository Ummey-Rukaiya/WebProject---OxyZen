import noteModel from "../models/noteModel.js";

// Get all notes for a user
export const getNotes = async (req, res) => {
  try {
    const userId = req.user._id;
    const notes = await noteModel.find({ user: userId }).sort({ createdAt: -1 });
    res.json({ success: true, notes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new note
export const createNote = async (req, res) => {
    try {
      const { content } = req.body; // Get the content of the note from the request body
  
      // Check if the content is provided
      if (!content) {
        return res.status(400).json({ success: false, message: 'Content is required' });
      }
  
      // Create a new note
      const newNote = new noteModel({
        user: req.body.userId, // This should be passed from the userAuth middleware
        content: content,
        dateCreated: new Date(), // Date when the note was created
      });
  
      // Save the note to the database
      await newNote.save();
  
      return res.status(201).json({ success: true, note: newNote }); // Respond with the saved note
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Error creating note' });
    }
  };
