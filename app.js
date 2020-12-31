const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const { use } = require('./routes/tourRoutes');

const app = express();
///////////////////////////////////////
//// Middleware ///////////////////////
/////////////////////////////////////

// security http headers
app.use(helmet());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// limit requests from same api
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// data sanitization against nosql query injection
app.use(mongoSanitize());

// data sanitization against xss
app.use(xss());

// serving static files
app.use(express.static(`${__dirname}/public`));

// prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// test middleware
app.use((req, res, next) => {
  // console.log('Something happened on the Server!');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

///////////////////////////////////////
//// Route Mounting ///////////////////
///////////////////////////////////////

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on server!`, 404));
});

app.use(globalErrorHandler);

///////////////////////////////////////
//// Start Server /////////////////////
///////////////////////////////////////

module.exports = app;
