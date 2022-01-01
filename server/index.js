const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
var session=require('express-session')
var MongoStore=require('connect-mongo')
var userRoute= require("./routers/userRouter"); 
// var adminRoute = require("./routers/adminRouter");
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
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials:true,

  })
);
app.use(session({
  secret: "Key",
  resave:false,
  saveUninitialized:true,
  store:MongoStore.create({
    mongoUrl:process.env.URL ,
    ttl:2*24*60*60,
    autoRemove:'native'
  })
}))

//Routers


app.use("/", userRoute);
// app.use("/admin", adminRoute); 

module.exports = app;