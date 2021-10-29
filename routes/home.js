const express = require("express");
const router = express.Router();
const UserModel = require("../models/Users");
const ExchangesModel = require("../models/Exchanges");
const SkillsModel = require("../models/Skills");

router.get("/", (req, res, next) => {
  res.render("./home-search/home");
});

router.get("/askCourse/:teacher/:skill", async (req, res, next) => {
  try {    
    console.log("teacher");
    console.log(req.params.teacher);
    console.log("skill");
    console.log(req.params.skill);
    console.log(req.session.currentUser._id)

     

    if(req.session.currentUser) {
      
      await ExchangesModel.create({
        teacher : req.params.teacher,
        student : req.session.currentUser._id,
        skillsName : req.params.skill,
        exchangeStatus : "in progress",
      })
      res.redirect("/profile");
    } else {
      res.redirect("/auth/signin")
    }
    
  } catch (error) {
    next(error)
  }
})

//A SUPPRIMER EN DESSOUS *******************************************************
router.post("/signin", async (req, res, next) => {
  // DO something
  //   res.render("auth/signin.hbs");
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email });

    if (!foundUser) {
      //   Display an error message telling the user that either the password
      // or the email is wrong
      req.flash("error", "Invalid credentials");
      res.redirect("/auth/signin");
    } else {
      // https://www.youtube.com/watch?v=O6cmuiTBZVs
      const isSamePassword = bcrypt.compareSync(password, foundUser.password);
      if (!isSamePassword) {
        // Display an error message telling the user that either the password
        // or the email is wrong
        req.flash("error", "Invalid credentials");
        res.redirect("/auth/signin");
      } else {
        // everything is fine so :
        // Authenticate the user...
        const userObject = foundUser.toObject(); // needed to convert mongoose object to classic js object
        delete userObject.password; // remove password before saving user in session
        // console.log(req.session, "before defining current user");
        req.session.currentUser = userObject;
        // above: Store the user in the session (data server side + a cookie is sent client side)

        // https://www.youtube.com/watch?v=nvaE_HCMimQ
        // https://www.youtube.com/watch?v=OFRjZtYs3wY

        req.flash("success", "Successfully logged in...");
        res.redirect("/profile");
      }
    }
  } catch (err) {
    next(err);
  }
});
//ASUPPRIMER AU DESSUS ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


router.get("/search", async function (req, res, next) {
  //   const regexp = new RegExp(req.query.search, "ig");

  let skillFilter = "";

  switch (req.query.level) {
    case "starter":
      skillFilter = {
        $or: [
          { level: "starter" },
          { level: "elementary" },
          { level: "intermediate" },
          { level: "advanced" },
          { level: "expert" },
        ],
      };
      break;
    case "elementary":
      skillFilter = {
        $or: [
          { level: "elementary" },
          { level: "intermediate" },
          { level: "advanced" },
          { level: "expert" },
        ],
      };
      break;
    case "intermediate":
      skillFilter = {
        $or: [
          { level: "intermediate" },
          { level: "advanced" },
          { level: "expert" },
        ],
      };
      break;
    case "advanced":
      skillFilter = { $or: [{ level: "advanced" }, { level: "expert" }] };
      break;
    case "expert":
      skillFilter = { level: "expert" };
      break;

    default:
      console.log("===============")
      skillFilter = {
        $or: [
          { level: "starter" },
          { level: "elementary" },
          { level: "intermediate" },
          { level: "advanced" },
          { level: "expert" },
        ],
      };
      break;
  }

  const regexp = new RegExp(req.query.search, "ig");
  try {
    const test = await UserModel.find().populate({
      path: "skills",
      match: { $and: [{ name: { $regex: regexp } }, skillFilter] },
    });

    // console.log("========");
    // console.log(test);
    const test3 = [];
    test2 = test.forEach(function (result) {
      if (result.skills.length) {
        test3.push(result);
      }
    });

    console.log(test3);
    // console.log(test3[0].skills);

    res.json(test3);
  } catch (err) {
    next(err);
  }
});

module.exports = router;