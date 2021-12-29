var router = require("express").Router();
const bcrypt = require("bcryptjs");
const userHelper = require("../helpers/userHelper");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    // console.log(req.cookies);
    const token = req.cookies.token;
    if (token) {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified.user;
      next();
    } else {
      res.status(401).json({ errorMessage: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const { fname, lname, email, password } = req.body;
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

    //Do signup

    userHelper
      .doSignup(fname, lname, email, passwordHash)
      .then((response) => {
        res.status(200).json({ message: "Registered" });
      })
      .catch((err) => {
        console.log(err);
        if (err.code === 11000) {
          res.status(400).json({ errorMessage: "This email is already exist" });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //Validate
    if (!email || !password) {
      res.status(400).json({ errorMessage: "Please enter required field" });
    }
    if (password.length < 6) {
      res
        .status(400)
        .json({ errorMessage: "Please enter atleast 6 characters" });
    }
    //Login
    userHelper.doLogin(email, password).then((response) => {
      if (response.status) {
        let userId = response.user._id.toString();
        const token = jwt.sign(
          {
            user: userId,
          },
          process.env.JWT_SECRET
        );
        //Send token to cookie
        res
          .cookie("token", token, {
            httpOnly: true,
          })
          .send();
      } else {
        res.status(401).json({ errorMessage: "Invalid email or password" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

router.post('/apply',(req,res)=>{
  userHelper.applyForm(req.body).then((response)=>{
    res.status(200).json({message:"Form submitted",success:true})
  }).catch((err)=>{
    console.log(err.code);
    res.status(200).json({errorCode:401})
  })
})

router.get("/loggedin", (req, res) => {
  try {
    const token = req.cookies.token;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET);
      // req.user = verified.user;
      res.send(true);
    } else {
      res.json(false);
    }
  } catch (error) {
    console.log(error);
    res.json(false);
  }
});

router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});

module.exports = router;
