import mongoose from 'mongoose';

const examSchema = new mongoose.Schema(
  {
    semester: {
      type: Number,
      required: [true, 'Please specify the semester number.'],
      enum: {
        values: [1, 2],
        message: 'Semester must be either 1 or 2.',
      },
    },
    type: {
      type: String,
      required: [true, 'Please specify the exam type.'],
      enum: {
        values: ['midterm', 'final'],
        message: 'Exam type must be either midterm or final.',
      },
    },
    lessonId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Lesson',
      required: [true, 'Lesson ID is a required field.'],
    },
    lessonTitle: {
      type: String,
      trim: true,
      required: [true, 'Please specify the lesson title.'],
    },
    scores: [
      {
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
      },
    ],
  },
  {
    timestamps: true,
  },
);

//Compound unique index for semester and type
examSchema.index({ semester: 1, type: 1, lessonId: 1 }, { unique: true });

const Exam = mongoose.model('Exam', examSchema);

export default Exam;
