import mongoose from 'mongoose';

const lessonListSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please specify lesson title.'],
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
});

lessonListSchema.index({ title: 1, grade: 1, field: 1 }, { unique: true });

const LessonList = mongoose.model('LessonList', lessonListSchema);

export default LessonList;
