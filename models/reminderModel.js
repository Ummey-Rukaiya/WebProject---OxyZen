import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plantName: {
    type: String,
    required: true
  },
  note: {
    type: String,
    default: ''
  },
  frequency: {
    type: String, // e.g., 'Daily', 'Weekly', 'Custom'
    required: true
  },
  nextDate: {
    type: Date,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Reminder = mongoose.model('Reminder', reminderSchema);

export default Reminder;

{/*const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  plantName: String,
  reminderDate: Date,
  notes: String,
});

module.exports = mongoose.model('Reminder', reminderSchema);*/}
