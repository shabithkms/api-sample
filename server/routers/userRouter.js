var router = require("express").Router();
const bcrypt = require("bcryptjs");
const userHelper = require("../helpers/userHelper");
const adminHelper = require("../helpers/adminHelper");
const jwt = require("jsonwebtoken");
const { json } = require("express");

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
        req.session.userLoggedIn = true;
        req.session.user = response.user;
        let userId = response.user._id.toString();
        const token = jwt.sign(
          {
            user: userId,
          },
          process.env.JWT_SECRET
        );
        console.log(response);
        //Send token to cookie
        let obj = {
          id: response.user._id.toString(),
          fname: response.user.fname,
          lname: response.user.lname,
          email: response.user.email,
        };
        console.log("obj",obj);
        res
          .cookie("token", token, {
            httpOnly: true,
          })
          .json(obj);
      } else {
        res.status(401).json({ errorMessage: "Invalid email or password" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

router.post("/apply", (req, res) => {
  userHelper
    .applyForm(req.body)
    .then((response) => {
      res.status(200).json({ message: "Form submitted", success: true });
    })
    .catch((err) => {
      console.log(err.code);
      res.status(200).json({ errorCode: 401 });
    });
});

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

//Admin Login
router.post("/admin/login", (req, res) => {
  console.log("in admin login");
  adminHelper.doAdminLogin(req.body).then((response) => {
    if (response.status) {
      let name = { name: response.admin.name };
      req.session.adminLoggedIn = true;
      req.session.admin = response.admin;
      res.status(200).json(name);
    } else {
      res.status(400).json({ error: "Incorrect password" });
    }
  });
});

//Get Application
router.get("/admin/getNewList", (req, res) => {
  try {
    adminHelper.getNewList().then((response) => {
      // console.log(response);
      res.status(200).json({ response });
    });
  } catch (error) {
    res.status(400).json({ error: "SOmething error" });
  }
});
router.get("/admin/getPendingList", (req, res) => {
  try {
    adminHelper.getPendingList().then((response) => {
      // console.log(response);
      res.status(200).json({ response });
    });
  } catch (error) {
    res.status(400).json({ error: "SOmething error" });
  }
});
router.get("/admin/getApprovedList", (req, res) => {
  try {
    adminHelper.getApprovedList().then((response) => {
      // console.log(response);
      res.status(200).json({ response });
    });
  } catch (error) {
    res.status(400).json({ error: "SOmething error" });
  }
});

router.post("/admin/changeStatus", (req, res) => {
  console.log("in change");
  console.log(req.body);
  const { status, id } = req.body;
  try {
    adminHelper
      .changeStatus(status, id)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(400), json({ error: "Something error" });
      });
  } catch (error) {
    res.status(400), json({ error: "Something error" });
  }
});

router.post("/admin/getDetails", (req, res) => {
  const { id } = req.body;
  try {
    adminHelper.getAppDetails(id).then((response) => {
      response = [response];
      res.status(200).json(response);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "something error" });
  }
});
router.get("/admin/getAllList", (req, res) => {
  console.log("api call");
  try {
    adminHelper.getAllList().then((response) => {
      res.status(200).json(response);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "something error" });
  }
});

router.post("/admin/addSlot", (req, res) => {
  adminHelper.addSlot().then((response) => {
    res.status(200).json({ added: "success" });
  });
});
router.post("/admin/deleteSlot", (req, res) => {
  adminHelper.deleteSlot().then((response) => {
    res.status(200).json({ added: "success" });
  });
});
router.get("/admin/getSlot", (req, res) => {
  adminHelper.getSlot().then((slotCount) => {
    res.status(200).json(slotCount);
  });
});
//Book slot
router.post("/admin/bookSlot", (req, res) => {
  console.log(req.body);
  const { Id, cId } = req.body;
  console.log(Id, cId);
  adminHelper.bookSlot(Id, cId).then((slotCount) => {
    res.status(200).json(slotCount);
  });
});
router.post("/admin/viewDetails", (req, res) => {
  console.log(req.body);
  const { sId } = req.body;
  adminHelper.getSlotData(sId).then((response) => {
    res.status(200).json(response);
  });
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
