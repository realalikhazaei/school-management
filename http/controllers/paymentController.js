import Payment from '../models/paymentModel.js';
import HttpError from '../utils/httpError.js';

const getAllPayments = async (req, res, next) => {
  const { schoolCode = undefined } = req.query;
  const payments = await Payment.find(schoolCode);

  res.status(200).json({
    status: 'success',
    results: payments.length,
    data: payments,
  });
};

const getPayment = async (req, res, next) => {
  const { _id: id } = req.params;
  const payment = await Payment.findById(id);
  if (!payment) return next(new HttpError(`No document found with this ID ${id}`, 404));

  res.status(200).json({
    status: 'success',
    data: payment,
  });
};

const createPayment = async (req, res, next) => {
  const { schoolId, schoolCode, expiration, amount } = req.body;

  const payment = await Payment.create({ schoolId, schoolCode, expiration, amount });

  const paymentSession = await fetch('https://gateway.zibal.ir/v1/request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      merchant: 'zibal',
      amount: payment.amount,
      orderId: payment._id,
      callbackUrl: 'http://127.0.0.1:5000/api/v1/payment/verify',
    }),
  });

  const sessionResult = await paymentSession.json();

  console.log(sessionResult.trackId); //eslint-disable-line

  return res.redirect(`https://gateway.zibal.ir/start/${sessionResult.trackId}`);
};

const verifyPaymentStatus = async (req, res, next) => {
  const { trackId, orderId } = req.query;

  const paymentResult = await fetch('https://gateway.zibal.ir/v1/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      merchant: 'zibal',
      trackId,
    }),
  });

  const { result } = await paymentResult.json();

  let statusCode = 402;
  let status = 'fail';
  let verb = 'was not';

  if (result === 100) {
    await Payment.findByIdAndUpdate(orderId, { trackId, paid: true }, { upsert: true });

    statusCode = 200;
    status = 'success';
    verb = 'was';
  } else if (result === 201) {
    statusCode = 200;
    status = 'success';
    verb = 'was';
  } else {
    await Payment.findByIdAndUpdate(orderId, { trackId });
  }

  return res.status(statusCode).json({
    status,
    message: `Your payment ${verb} successful.`,
    data: { orderId, trackId },
  });
};

export default { getAllPayments, getPayment, createPayment, verifyPaymentStatus };
