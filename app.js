const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

///////////////////////////////////////
//// Middleware ///////////////////////
///////////////////////////////////////

app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
    console.log('hello from the middleware');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

///////////////////////////////////////
//// Route Mounting ///////////////////
///////////////////////////////////////

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

///////////////////////////////////////
//// Start Server /////////////////////
///////////////////////////////////////

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
