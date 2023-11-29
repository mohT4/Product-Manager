const express = require('express');
const productController = require('../controller/productController');
const purchaseRouter = require('./purchaseRouter');

const router = express.Router();
router.use('/:productId/purchase', purchaseRouter);

router
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.createProduct);
router
  .route('/:id')
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
