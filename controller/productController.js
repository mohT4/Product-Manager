const Products = require('../models/products');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const ApiFeatures = require('../utils/apiFeatures');

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Products.find(), req.query)
    .filter()
    .field()
    .limit()
    .sort();

  const products = await features.query;

  res.status(200).json({
    status: 'success',
    data: {
      products: products,
    },
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Products.findById(req.params.id);
  if (!product)
    return next(new AppError(404, 'no product was found with that id'));

  res.status(200).json({
    status: 'sucess',
    data: {
      product: product,
    },
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Products.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      newProduct,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = Products.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product)
    return next(new AppError(404, 'no product was found with that id'));

  res.status(200).json({
    status: 'success',
    data: {
      product: product,
    },
  });
});

exports.deleteProduct = catchAsync(async () => {
  const product = await Products.findByIdAndDelete(req.params.id);

  if (!product)
    return next(new AppError(404, 'no product was found with that id'));

  res.status(200).json({
    status: 'success',
    data: null,
  });
});
