import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

router.post('/sign-up/school', authController.signupSchool);
router.post('/sign-up/manager', authController.signupManager);
router.post('/sign-up/users', authController.signupUsers);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);
router.patch('/update-password', authController.updatePassword);

export default router;
