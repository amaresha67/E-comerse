const { Update, userdata, loginValidation } = require("../contolers/Admin");
const {
  addProduct,
  getProductsData,
  deleteProduct,
  updateProductsData,
  getProductsDataByuser,
} = require("../contolers/product");

const {
  saveUserData,
  UserloginValidation,
  getUserId,
  getUserData,
} = require("../contolers/User");

const { addToCart, cartItems, removeCartItems } = require("../contolers/cart");
const { addOrder, OrderList, DeleteOrder } = require("../contolers/order");
const express = require("express");
const router = express.Router();

router.post("/admin/update", Update);
router.post("/admin/getprofile", userdata);
router.post("/admin/loginvalidate", loginValidation);

router.post("/user/saveUser", saveUserData);
router.post("/user/userLoginValidate", UserloginValidation);
router.post("/user/getProductsDataByuser", getProductsDataByuser);
router.post("/user/getUserId", getUserId);
router.post("/user/getuserdata", getUserData);

router.post("/product/addproduct", addProduct);
router.get("/product/getproductsdata", getProductsData);
router.post("/product/updateproduct", updateProductsData);
router.post("/product/deleteproduct", deleteProduct);

router.post("/cart/addtocart", addToCart);
router.post("/cart/cartitems", cartItems);
router.post("/cart/removecartitems", removeCartItems);

router.post("/order/placeorder", addOrder);
router.post("/order/getorderdata", OrderList);
router.post("/order/deleteorder", DeleteOrder);

module.exports = router;
