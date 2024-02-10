const Admin = require("../models/AdminSchema");

const Update = async (req, res) => {
  const bodydata = req.body;
  console.log(
    bodydata.username,
    bodydata.email,
    bodydata.phoneno,
    bodydata.address,
    bodydata.dob,
    bodydata.password,
    bodydata.email1,
    bodydata.password1
  );

  try {
    const savedUser = await Admin.updateOne(
      { email: bodydata.email1, password: bodydata.password1 },
      {
        $set: {
          username: bodydata.username,
          email: bodydata.email,
          phoneno: bodydata.phoneno,
          address: bodydata.address,
          dob: bodydata.dob,
          password: bodydata.password,
        },
      }
    );
    console.log("User updated:", savedUser);
    res.json({ message: "Data Updated Succesfully" });
  } catch (error) {
    console.error("Error:", error);
    res.json({ message: "Data Invalid" });
  }
};

const userdata = async (req, res) => {
  const bodydata = req.body;

  try {
    const savedUser = await Admin.find({
      email: bodydata.email,
      password: bodydata.password,
    });
    console.log("User saved:", savedUser);
    res.json({ code: 0, data: savedUser });
  } catch (error) {
    console.error("Error:", error);
    res.json({ code: 1, message: " error occured while fething data" });
  }
};

const loginValidation = async (req, res) => {
  const bodydata = req.body;

  try {
    const savedUser = await Admin.find({
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

module.exports = { Update, userdata, loginValidation };
