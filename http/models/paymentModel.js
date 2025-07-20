import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.ObjectId,
    ref: 'School',
  },
  schoolCode: {
    type: Number,
    required: [true, 'School code is required.'],
  },
  expiration: {
    type: Date,
    required: [true, 'Subscription expiration date is required.'],
  },
  date: {
    type: Date,
    default: new Date(),
  },
  amount: {
    type: Number,
    required: [true, 'Payment amount is required.'],
  },
  trackId: {
    type: String,
    unique: [true, 'This track ID already exists.'],
    sparse: true,
  },
  paid: {
    type: Boolean,
    default: false,
  },
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
