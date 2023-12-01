const express = require('express');
const logger = require('./middlewares/logger/logger');
const httpLogger = require('./middlewares/logger/httpLogger');
const globalErrorHandler = require('./middlewares/errorHandler');
const AppError = require('./utils/appError');
const productRouter = require('./router/productRouter');
const userRouter = require('./router/userRouter');
const purchaseRouter = require('./router/purchaseRouter');
const cardsRouter = require('./router/cardRouter');

const app = express();

//global middlwares

//reading data from body
app.use(express.json());

//development loggin
app.use(httpLogger);
logger.info(process.env.NODE_ENV);

app.use('/api/v1/products', productRouter);
app.use('/api/v1/purchase/stats', purchaseRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/cards', cardsRouter);

app.use('*', (req, res, next) => {
  next(new AppError(400, `can't find ${req.originalUrl}`));
});
app.use(globalErrorHandler);

module.exports = app;
