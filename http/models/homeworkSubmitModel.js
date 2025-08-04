import mongoose from 'mongoose';

const homeworkSubmitSchema = new mongoose.Schema(
  {
    homework: {
      type: mongoose.Schema.ObjectId,
      ref: 'Homework',
      required: [true, 'Please provide the homework ID.'],
    },
    studentId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please provide the student ID.'],
    },
    studentFirstname: {
      type: String,
      trim: true,
      index: true,
      required: [true, 'Please provide the student first name.'],
    },
    studentLastname: {
      type: String,
      trim: true,
      index: true,
      required: [true, 'Please provide the student last name.'],
    },
    images: [String],
    score: {
      type: Number,
      min: [0, 'Score cannot be less than 0.'],
      max: [20, 'Score cannot be more than 20.'],
    },
  },
  {
    timestamps: true,
  },
);

const HomeworkSubmit = mongoose.model('HomeworkSubmit', homeworkSubmitSchema);

export default HomeworkSubmit;
