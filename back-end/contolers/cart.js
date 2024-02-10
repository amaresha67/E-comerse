const Cart = require("../models/CartSchema");

//add to cart
const addToCart = async (req, res) => {
  const bodydata = req.body;
  console.log(bodydata.userid, bodydata.productid);

  const cartitem = new Cart({
    userid: bodydata.userid,
    productid: bodydata.productid,
  });

  try {
    const cartItem = await cartitem.save();
    console.log("product added to cart :", cartItem);
    res.json({ code: 0, message: " Added  to cart succesfully" });
  } catch (error) {
    console.error("Error:", error);
    res.json({ code: 1, message: "data invalid" });
  }
};

//get cart items
const cartItems = async (req, res) => {
  const bodydata = req.body;
  console.log("userid:", bodydata.userid);

  try {
    const cartItem = await Cart.aggregate([
      {
        $match: {
          userid: bodydata.userid,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productid",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $project: {
          userid: bodydata.userid,
          productid: "$productDetails._id",
          productdescription: "$productDetails.productdescription",
          productName: "$productDetails.productname",
          price: "$productDetails.price",
        },
      },
    ]);

    console.log("cart items :", cartItem);
    res.json({ code: 0, message: cartItem });
  } catch (error) {
    console.error("Error:", error);
    res.json({ code: 1, message: "data invalid" });
  }
};

//removing cartitem
const removeCartItems = async (req, res) => {
  const bodydata = req.body;
  const productid = bodydata.productid;
  try {
    const deletedItem = await Cart.deleteOne({ productid: productid });
    res.json({ code: 0, message: deletedItem });
  } catch (err) {
    console.error("Error:", err);
    res.json({ code: 1, message: "data invalid" });
  }
};

module.exports = { addToCart, cartItems, removeCartItems };
