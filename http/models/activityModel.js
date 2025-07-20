import mongoose, { mongo } from 'mongoose';

const childActivitySchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please provide the student ID.'],
  },
  studentName: {
    type: String,
    trim: true,
    required: [true, 'Please provide the student name.'],
  },
});

const activitySchema = new mongoose.Schema({
  absences: [childActivitySchema],
  points: [childActivitySchema],
  penalties: [childActivitySchema],
  date: {
    type: Date,
  },
  lessonId: {
    type: mongoose.Schema.ObjectId,
  },
  lessonWeekday: {
    type: String,
  },
  lessonTitle: {
    type: String,
  },
});

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;
