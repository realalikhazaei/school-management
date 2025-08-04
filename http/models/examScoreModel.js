import mongoose from 'mongoose';

const examScoreSchema = new mongoose.Schema({
  exam: {
    type: mongoose.Schema.ObjectId,
    ref: 'Exam',
    required: [true, 'Please provide the exam ID.'],
  },
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
  score: {
    type: Number,
    default: 0,
    min: [0, 'Score cannot be less than 0.'],
    max: [20, 'Score cannot be more than 20.'],
  },
});

const ExamScore = mongoose.model('ExamScore', examScoreSchema);

export default ExamScore;
