import Reminder from '../models/reminderModel.js';

// CREATE Reminder
export const createReminder = async (req, res) => {
  const userId = req.user.id;
  const { plantName, note, frequency, nextDate } = req.body;

  if (!plantName || !frequency || !nextDate) {
    return res.status(400).json({ success: false, message: "All required fields must be filled" });
  }

  try {
    const newReminder = await Reminder.create({
      userId,
      plantName,
      note,
      frequency,
      nextDate,
    });

    res.status(201).json(newReminder);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET All Reminders
export const getReminders = async (req, res) => {
  const userId = req.user.id;

  try {
    const reminders = await Reminder.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE Reminder
export const updateReminder = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { plantName, note, frequency, nextDate, isCompleted } = req.body;

  try {
    const reminder = await Reminder.findOne({ _id: id, userId });

    if (!reminder) {
      return res.status(404).json({ success: false, message: "Reminder not found" });
    }

    reminder.plantName = plantName ?? reminder.plantName;
    reminder.note = note ?? reminder.note;
    reminder.frequency = frequency ?? reminder.frequency;
    reminder.nextDate = nextDate ?? reminder.nextDate;
    reminder.isCompleted = isCompleted ?? reminder.isCompleted;

    await reminder.save();

    res.status(200).json(reminder);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE Reminder
export const deleteReminder = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const reminder = await Reminder.findOneAndDelete({ _id: id, userId });

    if (!reminder) {
      return res.status(404).json({ success: false, message: "Reminder not found" });
    }

    res.status(200).json({ success: true, message: "Reminder deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



