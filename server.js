const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
);

mongoose
    //.connect(process.env.DATABASE_LOCAL, {and fit the stuff below in here})
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log('DB connection successful'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`App running on port ${port}...`);
});
