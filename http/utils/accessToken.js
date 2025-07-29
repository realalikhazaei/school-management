import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/userModel.js';
import AppError from './appError.js';

/**
 *
 * @param {object} res
 * @param {string} userId
 * @param {date} premiumExpires
 * @param {string} message
 * @param {number} statusCode
 * @returns
 * @default statusCode=200
 */
const signSendToken = async (res, userId, premiumExpires, message, statusCode = 200) => {
  if (!userId || !premiumExpires) throw new Error('Please provide all necessary data.');

  const accessToken = await promisify(jwt.sign)({ userId, premiumExpires }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie('accessToken', accessToken, {
    expires: new Date(process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
    secure: process.env.NODE_ENV === 'prodoction' ? true : false,
    httpOnly: true,
  });

  return res.status(statusCode).json({
    status: 'success',
    message,
    accessToken,
  });
};

/**
 *
 * @param {string} accessToken
 * @param  {...string} roles
 * @returns
 */
const verifyToken = async (accessToken, ...roles) => {
  if (!accessToken) throw new AppError('Pleae login to access this route.', 401);

  let payload;
  try {
    payload = await promisify(jwt.verify)(accessToken, process.env.JWT_SECRET);
  } catch (err) {
    switch (err.message) {
      case 'invalid signature':
        throw new AppError('Your login session is wrong. Please login again.', 401);

      case 'jwt expired':
        throw new AppError('Your login session is expired. Please login again.', 401);
    }
  }

  if (new Date(payload.premiumExpires) < new Date())
    throw new AppError('The school subscription plan is expired.', 402);

  const user = await User.findById(payload.userId);
  if (!user) throw new AppError('Your account has been either deleted or deactivated.', 401);

  const passwordChanged = user.passwordChangedAfter(payload.iat);
  if (passwordChanged) throw new AppError('Your password has been changed. Please login again.', 401);

  if (roles.length && !roles.includes(user.role))
    throw new AppError('You are not allowed to perform this action.', 403);

  return user._doc;
};

export { signSendToken, verifyToken };
