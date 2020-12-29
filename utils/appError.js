class AppError extends Error {
  constructor(message, statusCode, name) {
    super(message, name);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

    this.isOperational = true;

    this.test = 'this is a test';

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
