import mongoose from 'mongoose';

const childActivitySchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please provide the student ID.'],
  },
  studentFirstname: {
    type: String,
    trim: true,
    required: [true, 'Please provide the student first name.'],
  },
  studentLastname: {
    type: String,
    trim: true,
    required: [true, 'Please provide the student last name.'],
  },
});

const activitySchema = new mongoose.Schema(
  {
    absences: [childActivitySchema],
    points: [childActivitySchema],
    penalties: [childActivitySchema],
    lessonId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Lesson',
      required: [true, 'Please provide the lesson ID.'],
    },
    lessonTitle: {
      type: String,
      trim: true,
      required: [true, 'Please specify the lesson title.'],
    },
    class: {
      type: mongoose.Schema.ObjectId,
      ref: 'Class',
      required: [true, 'Please specify the class ID.'],
    },
    teacher: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please specify the teacher ID.'],
    },
    lessonWeeklyTime: {
      type: String,
      required: [true, 'Please specify lesson weekly time.'],
    },
  },
  {
    timestamps: true,
  },
);

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;
