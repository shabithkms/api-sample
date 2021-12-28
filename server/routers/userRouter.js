const router = require("express").Router();
const bcrypt = require("bcryptjs");
const userHelper = require("../helpers/userHelper");
const jwt = require('jsonwebtoken')

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    //Validation
    if (!email || !password) {
      res.status(400).json({ errorMessage: "Please enter required field" });
    }
    if (password.length < 6) {
      res
        .status(400)
        .json({ errorMessage: "Please enter atleast 6 characters" });
    }
    const salt = bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, 10).catch((err) => {
      console.log(err);
    });
    userHelper
      .doSignup(email, passwordHash)
      .then((response) => {
        res.status(200).json({ message: "Registered" });
      })
      .catch((err) => {
        if (err.code === 11000) {
          res.status(400).json({ errorMessage: "This email is already exist" });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

module.exports = router;
