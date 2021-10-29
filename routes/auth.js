const express = require("express");
const router = express.Router();
const UserModel = require("./../models/Users");
const bcrypt = require("bcrypt");

router.get("/signin", (req, res, next) => {
  
  res.render("auth/signin");
});

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.get("/signout", (req, res, next) => {
  req.session.destroy(function (err) {
    res.redirect("/auth/signin");
  });
});

router.post("/signin", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const foundUser = await UserModel.findOne({ email: email });
    if (!foundUser) {
      console.log("EEREURER")

      req.flash("error", "Invalid credentials");
      res.redirect("/auth/signin");
    } else {
      const isSamePassword = bcrypt.compareSync(password, foundUser.password);
      if (!isSamePassword) {
        //insert flash here
        req.flash("error", "Invalid credentials");
        res.redirect("/auth/signin");
      } else {
        const userSession = foundUser.toObject();
        delete userSession.password;

        req.session.currentUser = userSession;

        //insert Flash here
        req.flash("success", "Successfully logged in...");
        res.redirect("/profile"); // might change the destination
      }
    }
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const newUser = { ...req.body };
    const foundUser = await UserModel.findOne({ email: newUser.email });

    if (foundUser) {
        //flash emssage here
        req.flash("warning", "Email already registered");
        res.redirect("/auth/signup")
    } else {
        const hashedPassword = bcrypt.hashSync(newUser.password, 10);
        newUser.password = hashedPassword;
        await UserModel.create(newUser);
        //another flash here
        req.flash("success", "Congrats ! You are now registered !");
        res.redirect("/auth/signin");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
