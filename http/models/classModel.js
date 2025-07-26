import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  alias: {
    type: String,
    trim: true,
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
  school: {
    type: mongoose.Schema.ObjectId,
    ref: 'School',
    required: [true, 'School ID is a required field.'],
  },
  field: String,
  timetable: [
    {
      lessonId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Lesson',
      },
      lessonTitle: {
        type: String,
        trim: true,
      },
      weeklyTimes: {
        type: [String],
        validate: {
          validator: function (val) {
            return val.length > 0;
          },
          message: 'Lesson weekly times cannot be empty.',
        },
      },
    },
  ],
});

const Class = mongoose.model('Class', classSchema);

export default Class;
