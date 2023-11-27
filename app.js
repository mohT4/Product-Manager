const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('./middlewares/logger/logger');
const httpLogger = require('./middlewares/logger/httpLogger');
const globalErrorHandler = require('./middlewares/errorHandler');
const AppError = require('./utils/appError');

dotenv.config();
const app = express();

app.use(httpLogger);

app.use('*', (req, res, next) => {
  next(new AppError(400, `can't find ${req.originalUrl}`));
});
app.use(globalErrorHandler);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => logger.info('data base connected ...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`app listening on port ${PORT}`);
});
