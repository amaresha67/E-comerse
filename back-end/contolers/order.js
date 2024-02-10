// const { DATE } = require("mysql/lib/protocol/constants/types");
const Order = require("../models/OrderSchema");

// adding product data
const addOrder = async (req, res) => {
  const bodydata = req.body;
  const highestOrder = await Order.find().sort({ _id: -1 }).limit(1);
  const highestorderid = highestOrder.length > 0 ? highestOrder[0]._id : 0;

  const currentDate = new Date();
  const newOrder = new Order({
    _id: parseInt(highestorderid) + 1,
    userid: bodydata.userid,
    productid: bodydata.productid,
    noOfItems: bodydata.noOfItems,
    date: currentDate,
  });

  try {
    const savedOrder = await newOrder.save();
    console.log("order saved:", savedOrder);
    res.json({ code: 0, message: "Order Added succesfully" });
  } catch (error) {
    console.error("Error:", error);
    res.json({ code: 1, message: "unable to place order" });
  }
};

//get order details
const OrderList = async (req, res) => {
  const bodydata = req.body;
  console.log("userid:", bodydata.userid);

  try {
    const OrderList = await Order.aggregate([
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
          _id: "$_id",
          userid: bodydata.userid,
          productid: "$productDetails._id",
          productdescription: "$productDetails.productdescription",
          productName: "$productDetails.productname",
          price: "$productDetails.price",
          noOfItems: "$noOfItems",
        },
      },
    ]);

    console.log("order list:", OrderList);
    res.json({ code: 0, message: OrderList });
  } catch (error) {
    console.error("Error:", error);
    res.json({ code: 1, message: "unable to fetch order values" });
  }
};

//delete the order
const DeleteOrder = async (req, res) => {
  const bodydata = req.body;
  try {
    const detetedOrder = await Order.deleteOne({ _id: bodydata._id });
    console.log("Deleted order :", detetedOrder);
    res.json({ code: 0, message: "Order Deleted succesfully" });
  } catch (error) {
    console.error("Error:", error);
    res.json({ code: 1, message: "unable to delete order" });
  }
};

module.exports = { addOrder, OrderList, DeleteOrder };
