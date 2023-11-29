const express = require('express');
const authController = require('../controller/authController');
const purchaseController = require('../controller/purchaseController');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(authController.protect, purchaseController.createPurchase)
  .get(authController.protect, purchaseController.getPurchaseDetails);

//purchase/stats endpoint

router.get(
  '/total-purchases',
  authController.protect,
  purchaseController.getTotalPurchases
);
router.get(
  '/top-sellings',
  authController.protect,
  purchaseController.getTopSellingProds
);
router.get(
  '/trends',
  authController.protect,
  purchaseController.getPurchaseTrend
);
module.exports = router;
