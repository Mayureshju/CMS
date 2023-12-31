const mongoose = require("mongoose");

const orderSchema  = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true,
      },
      orderedProducts: [
        {
          product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
          quantity: Number,
        },
        
      ],
      orderDescription: {
        type: String,
      },
      orderTotal: {
        type: Number,
        required: true,
      },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },

});

module.exports = mongoose.model("Order", orderSchema);
