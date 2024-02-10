const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDatabase = require("./config/Database");
const router = require("./routers/routs");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const db = connectDatabase.connection;
db.on("error", (error) => console.error("MongoDB connection error:", error));
db.once("open", () => console.log("Connected to MongoDB"));
app.use("/", router);
app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
