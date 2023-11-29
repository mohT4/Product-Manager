const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'a product must have a name'],
    },
    category: {
      type: String,
      required: [true, 'a prodcut must have a category'],
    },
    price: {
      type: Number,
      require: [true, 'a product must have a price'],
    },
    availability: {
      type: String,
      required: [true, 'a product must have availability'],
      enum: {
        values: ['yes', 'no'],
        message: 'availability is either yes or no',
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.index({ price: 1, name: 1 });

const Prodcuts = mongoose.model('products', productSchema);

module.exports = Prodcuts;
