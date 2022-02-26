const asyncHandler = require("express-async-handler");
const csvtojson = require("csvtojson");

const Product = require("../models/productModel");
const User = require("../models/userModel");

// @desc    Get products
// @route   GET /api/products
// @access  Private
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  res.status(200).json(products);
});

// @desc    Set products
// @route   POST /api/products
// @access  Private

const setProducts = asyncHandler(async (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const user = await User.findOne({ usename: req.user });
  // console.log(user);
  if (user.isAdmin) {
    const product = await Product.create({
      name,
      price,
    });

    if (product) {
      res.status(201).json(product);
    } else {
      res.status(400);
      throw new Error("Invalid data");
    }
  } else {
    res.status(403).send("Only admin can add product details");
  }
});

// @desc    update products
// @route   PUT /api/products/:id
// @access  Private

const updateProducts = asyncHandler(async (req, res) => {
  const user = await User.findById({ _id: req.user._id });

  if (user.isAdmin) {
    const product = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.status(200).send("Details updated");
  } else {
    res.status(403).send("Only admin can update product details");
  }
});

// @desc    delete products
// @route   DELETE /api/products/:id
// @access  Private
const deleteProducts = asyncHandler(async (req, res) => {
  const user = await User.findById({ _id: req.user._id });

  if (user.isAdmin) {
    const product = await Product.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send("Product deleted");
  } else {
    res.status(403).send("Only admin can delete product details");
  }
});

module.exports = {
  getProducts,
  setProducts,
  updateProducts,
  deleteProducts,
};
