const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      productStock,
      adminPrice,
      customerPrice,
    } = req.body;
    

    const newProduct = new Product({
      productName,
      productDescription,
      productStock,
      adminPrice,
      customerPrice,
    });

    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Product added error",
    });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      productStock,
      adminPrice,
      customerPrice,
      productId
    } = req.body;
    
  

    // Find the product by ID in the database
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the product information
    product.productName = productName || product.productName;
    product.productDescription = productDescription || product.productDescription;
    product.productStock = productStock || product.productStock;
    product.adminPrice = adminPrice || product.adminPrice;
    product.customerPrice = customerPrice || product.customerPrice;

    // Save the updated product
    await product.save();

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Product update error",
    });
  }
};

exports.getSingleProduct = async (req, res) => {
  try {
    // Get the product ID from the request parameters
    const {productId} = req.body;

    // Find the product by ID in the database
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product retrieved successfully", product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while fetching the product",
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    // Find all products in the database
    const products = await Product.find();

    res.status(200).json({ message: "Products retrieved successfully", products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while fetching products",
    });
  }
};