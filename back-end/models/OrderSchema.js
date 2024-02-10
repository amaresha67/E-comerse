const mongoose = require("mongoose");
// const { ATE } = require("mysql/lib/protocol/constants/types");

// Define the User schema
const orderSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: false,
  },
  userid: {
    type: String,
    required: true,
  },
  productid: {
    type: String,
    required: true,
  },
  noOfItems: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

// Create a model basedon the schema
const order = mongoose.model("order", orderSchema);

module.exports = order;
