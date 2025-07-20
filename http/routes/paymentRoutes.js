import express from 'express';
import paymentController from '../controllers/paymentController.js';

const router = express.Router();

router.get('/verify', paymentController.verifyPaymentStatus);
router.get('/:_id', paymentController.getPayment);
router.route('/').get(paymentController.getAllPayments).post(paymentController.createPayment);

export default router;
