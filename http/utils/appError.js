const AppError = class extends Error {
  /**
   *
   * @param {String} message
   * @param {Number} statusCode
   */
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.status = statusCode < 500 ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
};

export default AppError;
