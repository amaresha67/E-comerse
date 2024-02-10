const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: false,
  },
  productname: {
    type: String,
    required: true,
    unique: false,
  },
  productdescription: {
    type: String,
    required: true,
    // unique: true,
  },
  price: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imagename: {
    type: String,
    required: true,
  },
});

const product = mongoose.model("Product", productSchema);

module.exports = product;
