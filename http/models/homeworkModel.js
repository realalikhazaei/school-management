import mongoose from 'mongoose';

const childHomeworkSchema = new mongoose.Schema(
  {
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

const homeworkSchema = new mongoose.Schema(
  {
    lessonId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Lesson',
      required: [true, 'Please provide the lesson ID.'],
    },
    lessonTitle: String,
    homeworks: [childHomeworkSchema],
    instruction: {
      type: String,
      maxlength: [500, 'Homework instruction cannot be more than 500 characters.'],
    },
    images: [String],
    deadline: {
      type: Date,
      required: [true, 'Please specify a deadline for homework.'],
      validate: {
        validator: function (val) {
          return val > Date.now();
        },
        message: 'Homework dead line is invalid.',
      },
    },
  },
  {
    timestamps: true,
  },
);

const Homework = mongoose.model('Homework', homeworkSchema);

export default Homework;
