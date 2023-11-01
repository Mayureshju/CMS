const Product = require('../models/Product')
const Order = require('../models/Order')
const {generateOrderID} = require('../utils/uid')

exports.addOrder = async (req, res) => {
    try {
      const { orderedProducts, orderDescription, orderTotal, userId } = req.body;
  
      if (!orderedProducts || !orderTotal) {
        return res.status(400).json({
          success: false,
          message: "Please submit all fields.",
        });
      }
  
      // Create a new order
      const newOrder = new Order({
        orderId: generateOrderID(), // You can generate a unique order ID here
        orderedProducts,
        orderDescription,
        orderTotal,
        user: userId, // Assuming you have the user's ID
      });
  
      await newOrder.save();
  
      // Update product stock for each ordered product
      for (const orderedProduct of orderedProducts) {
        const product = await Product.findById(orderedProduct.product);
        
        if (product) {
          // Ensure that the productStock is an array, and subtract the ordered quantity
          product.productStock -= orderedProduct.quantity;
  
          await product.save();
        }
      }
  
      res.status(201).json({ message: "Order added successfully", order: newOrder });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Order added error",
      });
    }
  };
  
  exports.deleteOrder = async (req, res) => {
    try {
      const {orderId} = req.body; // Assuming you pass the orderId as a parameter
  
      // Find the order by its ID
      const order = await Order.findOne({orderId:orderId});
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      // Update product stock for each ordered product in the order
      for (const orderedProduct of order.orderedProducts) {
        const product = await Product.findById(orderedProduct.product);
  
        if (product) {
          // Add back the ordered quantity to the product stock
          product.productStock += orderedProduct.quantity;
  
          await product.save();
        }
      }
  
      // Delete the order
      await order.remove();
  
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Order deletion error",
      });
    }
  };