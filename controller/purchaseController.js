const Purchase = require('../models/purchase.js');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//create a new purchase
exports.createPurchase = catchAsync(async (req, res, next) => {
  //we get the user id from the protect function
  const user = req.user.id;

  // we get the product Id from params
  const product = req.params.productId;
  const quantity = req.body.quantity;

  const purchase = await Purchase.create({
    user,
    quantity,
    product,
  });

  res.status(201).json({
    status: 'success',
    data: {
      purchase: purchase,
    },
  });
});

//read Purchase details
exports.getPurchaseDetails = catchAsync(async (req, res, next) => {
  let filter = { product: req.params.productId, user: req.user.id };
  const purchase = await Purchase.find(filter);

  res.status(200).json({
    status: 'success',
    data: {
      purchase: purchase,
    },
  });
});

//read the total purchases
exports.getTotalPurchases = catchAsync(async (req, res, next) => {
  const stats = await Purchase.countDocuments();
  res.status(200).json({
    status: 'success',
    data: {
      total_Purchases: stats,
    },
  });
});

//read the top selling products using aggregate and populating the product name
exports.getTopSellingProds = catchAsync(async (req, res, next) => {
  const stats = await Purchase.aggregate([
    {
      $group: {
        _id: '$product',
        total_sold: { $sum: '$quantity' },
      },
    },
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        as: 'product',
      },
    },
    {
      $unwind: '$product',
    },
    {
      $project: {
        _id: 0,
        product: '$product.name',
        total_sold: 1,
      },
    },
    {
      $sort: {
        total_sold: -1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats: stats,
    },
  });
});

//read the purchase trends
exports.getPurchaseTrend = catchAsync(async (req, res, next) => {
  const stats = await Purchase.aggregate([
    {
      $group: {
        _id: {
          year: { $year: '$date' },
          month: { $month: '$date' },
          product: '$product',
        },
        total_Purchases: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: 'products',
        localField: '_id.product',
        foreignField: '_id',
        as: 'product',
      },
    },
    {
      $unwind: '$product',
    },
    {
      $project: {
        _id: 0,
        year: '$_id.year',
        month: '$_id.month',
        product: '$product.name',
        total_Purchases: 1,
      },
    },
    {
      $sort: {
        year: 1,
        month: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats: stats,
    },
  });
});
