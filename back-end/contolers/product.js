const Product = require("../models/ProductSchema");

// adding product data
const addProduct = async (req, res) => {
  const bodydata = req.body;
  const highestProduct = await Product.find().sort({ _id: -1 }).limit(1);
  const highestproductid =
    highestProduct.length > 0 ? highestProduct[0]._id : 0;

  const newProduct = new Product({
    _id: parseInt(highestproductid) + 1,
    productname: bodydata.productname,
    productdescription: bodydata.productdescription,
    price: bodydata.price,
    category: bodydata.category,
    imagename: bodydata.imagename,
  });

  try {
    const savedProduct = await newProduct.save();
    console.log("User saved:", savedProduct);
    res.json({ message: "Product Added succesfully" });
  } catch (error) {
    console.error("Error:", error);
    res.json({ message: "data invalid" });
  }
};

//accesing product data by admin
const getProductsData = async (req, res) => {
  try {
    const Productsdata = await Product.find();
    res.json({ Productsdata });
  } catch (error) {
    console.error("Error:", error);
    res.json({ message: "error occured while product data accesing " });
  }
};

//accesing product data by user
const getProductsDataByuser = async (req, res) => {
  const bodyData = req.body;
  console.log("getProductsDataByuser");
  try {
    console.log("getproductdatabyuser");
    const Productsdata = await Product.find({ category: bodyData.category });
    console.log(Productsdata);
    res.json({ Productsdata });
  } catch (error) {
    console.error("Error:", error);
    res.json({ message: "error occured while product data accesing " });
  }
};

//delete product
const deleteProduct = async (req, res) => {
  const bodydata = req.body;
  var p_id = bodydata._id;
  console.log(p_id);
  try {
    const deletedProduct = await Product.deleteOne({ _id: "" + p_id });
    console.log("Deleted Product is:", deletedProduct);
    res.json({ message: "Product Deleted succesfully" });
  } catch (error) {
    console.error("Error:", error);
    res.json({ message: "you provided invalid data" });
  }
};

//update product
const updateProductsData = async (req, res) => {
  const bodydata = req.body;
  var p_id = bodydata.id;
  try {
    const updateProduct = await Product.updateOne(
      { _id: p_id },
      {
        $set: {
          productname: bodydata.productname,
          productdescription: bodydata.productdescription,
          price: bodydata.price,
          category: bodydata.category,
          imagename: bodydata.imagename,
        },
      }
    );

    console.log("product updated is:", updateProduct);
    res.json({ message: "product updated succesfully" });
  } catch (error) {
    console.error("Error:", error);
    res.json({ message: "you provided invalid data" });
  }
};
module.exports = {
  addProduct,
  getProductsData,
  deleteProduct,
  updateProductsData,
  getProductsDataByuser,
};
