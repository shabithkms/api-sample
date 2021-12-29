const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
var db = require("./config/connection");
db.connect((err) => {
  if (err) console.log("Connection error" + err);
  else console.log("Database connected");
});

const PORT = process.env.PORT;
app.get("/", (req, res) => {
  res.send("In home page");
});

app.get("/api", (req, res) => {
  try {
    res.json({ message: "Sample from server" });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.listen(PORT, () => {
  console.log(`sever running on ${PORT}`);
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials:true,

  })
);

//Routers
var userRouter = require("./routers/userRouter"); 
// var adminRouter = require("./routers/adminRouter");

app.use("/", userRouter);
// app.use("/admin", adminRouter);
