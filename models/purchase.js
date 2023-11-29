const mongoose = require('mongoose');

purchaseSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'products',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

purchaseSchema.index({ quantity: 1 });

purchaseSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name',
  });
  next();
});
purchaseSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'product',
    select: 'name id',
  });
  next();
});

const Purchase = mongoose.model('purchase', purchaseSchema);
module.exports = Purchase;
