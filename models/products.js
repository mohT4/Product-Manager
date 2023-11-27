const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
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
});

const Prodcuts = mongoose.model('products', productSchema);

module.exports = Prodcuts;
