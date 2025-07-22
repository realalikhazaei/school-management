import crypto from 'crypto';
import User from '../models/userModel.js';
import School from '../models/schoolModel.js';
import AppError from '../utils/appError.js';
import { signSendToken, verifyToken } from '../utils/accessToken.js';

const signupSchool = async (req, res, next) => {
  const { name, code } = req.body;

  const school = await School.create({ name, code });

  res.status(201).json({
    status: 'success',
    data: school,
  });
};

const signupManager = async (req, res, next) => {
  const { school: schoolId } = req.body;
  const school = await School.findOne({ _id: schoolId, manager: undefined });
  if (!school) return next(new AppError(`There is no free school with this ID ${schoolId}.`, 404));
  if (!school.isVerified) return next(new AppError('School is not verified. Please contact support.', 401));

  const manager = await User.create({ ...req.body, role: 'manager', school: schoolId });
  school.manager = manager._id;
  await school.save();

  await signSendToken(res, manager._id, school.premiumExpires, 'Your account has been created successfully.', 201);
};

const signupUsers = async (req, res, next) => {
  const { users } = req.body;
  users.forEach(el => {
    el.password = el.idCard;
    el.passwordConfirm = el.idCard;
    return;
  });

  const result = await User.create(users);

  res.status(201).json({
    status: 'success',
    message: `${result.length} user(s) have been added successfully.`,
  });
};

const login = async (req, res, next) => {
  const { idCard, password } = req.body;
  if (!idCard) return next(new AppError('Please provide your ID card number.', 400));
  if (!password) return next(new AppError('Please provide your password.', 400));

  const user = await User.findOne({ idCard }, 'school password');
  const correct = await user?.comparePassword(password);
  if (!user || !correct) return next(new AppError('There is no user with this ID card number and password.', 404));

  const { premiumExpires } = await School.findById(user.school, 'premiumExpires');

  await signSendToken(res, user._id, premiumExpires, 'You have been logged in successfully.');
};

const updatePassword = async (req, res, next) => {
  const accessToken = req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];
  const user = await verifyToken(accessToken);

  const { currentPassword, newPassword, newPasswordConfirm } = req.body;

  if (!currentPassword) return next(new AppError('Please provide your current password.', 400));
  const correct = await user.comparePassword(currentPassword);
  if (!correct) return next(new AppError('Your current password is wrong.', 401));

  user.password = newPassword;
  user.passwordConfirm = newPasswordConfirm;
  await user.save();

  const { premiumExpires } = await School.findById(user.school, 'premiumExpires');

  await signSendToken(res, user._id, premiumExpires, 'Your password has been updated successfully.');
};

const forgotPassword = async (req, res, next) => {
  const { idCard } = req.body;

  const user = await User.findOne({ idCard }, 'phone');

  const passwordResetToken = user?.createPasswordResetToken();
  const url = `${req.protocol}://${req.get('host')}/api/v1/reset-password/${passwordResetToken}`;
  const message = `Here is your password reset link. It'll be expired in 10 mins.\n${url}`;
  await user.save();

  console.log(message); //eslint-disable-line

  res.status(200).json({
    status: 'success',
    message: `A password reset link has been sent to ${user.phone} phone number.`,
  });
};

const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne(
    { passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } },
    'school',
  );
  if (!user) return next(new AppError('Your password reset token is either wrong or expired.', 401));

  const { password, passwordConfirm } = req.body;
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  const { premiumExpires } = await School.findById(user.school, 'premiumExpires');

  await signSendToken(res, user._id, premiumExpires, 'Your password has been reset successfully.');
};

export default { signupSchool, signupManager, signupUsers, login, updatePassword, forgotPassword, resetPassword };
