const mongoose = require("mongoose");

// Define the User schema
const cartSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  productid: {
    type: String,
    required: true,
  },
});

// Create a model basedon the schema
const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;
