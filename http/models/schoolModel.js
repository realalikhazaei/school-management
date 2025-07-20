import mongoose from 'mongoose';

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please provide school name.'],
  },
  code: {
    type: Number,
    required: [true, 'Please provide school code.'],
    unique: [true, 'This school code already exists.'],
  },
  manager: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  premiumExpires: {
    type: Date,
    default: Date.now(),
  },
});

const School = mongoose.model('School', schoolSchema);

export default School;
