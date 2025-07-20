import HttpError from '../utils/httpError.js';

const devErr = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const prodErr = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

const uniqueErrDB = err => {};

const validationErrDB = err => {};

const invalidIdErrDB = err => {};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode ||= 500;
  err.status ||= 'error';
  let error;
  if (process.env.NODE_ENV === 'development') return devErr(err, res);
  if (process.env.NODE_ENV === 'production') {
    return prodErr(err, res);
    error = prodErr(err, res);
  }
};

export default globalErrorHandler;
