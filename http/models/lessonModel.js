import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  class: {
    type: mongoose.Schema.ObjectId,
    ref: 'Class',
    required: [true, 'Please specify the class ID.'],
  },
  title: {
    type: String,
    trim: true,
    required: [true, 'Please specify the lesson title.'],
  },
  grade: {
    type: Number,
    required: [true, 'Please specify the grade.'],
    min: [1, 'Grade cannot be less than 1.'],
    max: [12, 'Grade cannot be more than 12.'],
    validate: {
      validator: function (val) {
        return val % 1 === 0;
      },
      message: 'Please enter an integer between 1 and 12.',
    },
  },
  field: {
    type: String,
    trim: true,
  },
  coefficient: {
    type: Number,
    default: 1,
  },
  weeklyTimes: {
    type: [String],
    required: [true, 'Lesson weekly times is a required field.'],
    validate: {
      validator: function (val) {
        return val.length > 0;
      },
      message: 'Lesson weekly times cannot be empty.',
    },
  },
  teacher: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please specify the teacher ID.'],
  },
});

lessonSchema.index({ title: 1, grade: 1, field: 1 }, { unique: true });

const Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;
