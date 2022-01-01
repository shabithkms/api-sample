var router = require("express").Router();
const bcrypt = require("bcryptjs");
const userHelper = require("../helpers/userHelper");
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  console.log("in admon  login");
  console.log(req.body);
});
