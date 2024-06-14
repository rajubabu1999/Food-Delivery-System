const express = require("express");
const router = express.Router();
const User = require("../models/user");

// validation
const { body, validationResult } = require("express-validator");
// ---------
// JWT token -------------
const jwt = require("jsonwebtoken");
const jwtSecret = "MynameisEndtoEndYouTubeChannel1$#";

// -----------------------

// bycript-----
const bcrypt = require("bcryptjs");
// ------------

router.post(
  "/creatuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //   handling validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // ------------------------------------
    // bycrypt part------------------------
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    //    -----------------------------------

    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ sucess: false });
    }
  }
);

// for login user
router.post(
  "/loginuser",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "incorrect password").exists(),
  ],
  async (req, res) => {
    //   handling validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // ------------------------------------
    let email = req.body.email;

    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Sahi formate me likho" });
      }

      //       bycript --------------
      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      )
      // -----------------------------
      console.log(req.body.password);
      console.log(userData.password);
      if (!pwdCompare) {
        return res.status(400).json({ errors: "pasword galat hai" });
      }

      //      jwt token--------------
      const data = {
        user: {
          id: userData.id
        }
      }

      const authToken = jwt.sign(data, jwtSecret);

      // -----------------------------

      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({ sucess: false });
    }
  }
);

module.exports = router;
