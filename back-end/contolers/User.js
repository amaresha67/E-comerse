const User = require("../models/UserSchema");

const saveUserData = async (req, res) => {
  const bodydata = req.body;
  console.log(bodydata.email, bodydata.password);

  const newUser = new User({
    email: bodydata.email,
    password: bodydata.password,
  });

  try {
    const savedUser = await newUser.save();
    console.log("User saved:", savedUser);
    res.json({ code: 0, message: "User Added succesfully" });
  } catch (error) {
    console.error("Error:", error);
    res.json({ code: 1, message: "data invalid" });
  }
};

//get userid
const getUserId = async (req, res) => {
  const bodydata = req.body;
  console.log(bodydata.email, bodydata.password);
  try {
    const UserData = await User.findOne({
      email: bodydata.email,
      password: bodydata.password,
    });
    console.log("User found:", UserData);
    res.json({ code: 0, UserData: UserData });
  } catch (error) {
    console.error("Error:", error);
    res.json({ code: 1, message: "data invalid" });
  }
};

//get user data

const getUserData = async (req, res) => {
  const bodydata = req.body;
  console.log(bodydata.userid);
  try {
    const UserData = await User.findOne({
      _id: bodydata.userid,
    });
    console.log("User Data:", UserData);
    res.json({ code: 0, UserData: UserData });
  } catch (error) {
    console.error("Error:", error);
    res.json({
      code: 1,
      message: "some error occured while feching user data",
    });
  }
};

const UserloginValidation = async (req, res) => {
  const bodydata = req.body;

  try {
    const savedUser = await User.find({
      email: bodydata.email,
      password: bodydata.password,
    });
    if (savedUser.length > 0) {
      console.log("User found:", savedUser);
      res.json({ code: 0, data: savedUser });
    } else {
      console.log("User not found:", savedUser);
      res.json({ savedUser });
    }
  } catch (error) {
    console.error("Error:", error);
    res.json({ message: " error occured while fecthing data" });
  }
};

module.exports = { saveUserData, UserloginValidation, getUserId, getUserData };
