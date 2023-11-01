const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
  },
  productStock: {
    type: Number,
    required: true,
  },
  adminPrice: {
    type: Number,
    required: true,
  },
  customerPrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
