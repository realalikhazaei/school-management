import mongoose from 'mongoose';

const homeworkSchema = new mongoose.Schema(
  {
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

//Virtual reference field for submitted homeworks
homeworkSchema.virtual('submitted', { ref: 'HomeworkSubmit', localField: '_id', foreignField: 'homework' });

const Homework = mongoose.model('Homework', homeworkSchema);

export default Homework;
