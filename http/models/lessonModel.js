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
  },
  grade: Number,
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

const Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;
