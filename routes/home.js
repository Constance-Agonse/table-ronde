const express = require("express");
const router = express.Router();
const UserModel = require("../models/Users");
const ExchangesModel = require("../models/Exchanges");
const SkillsModel = require("../models/Skills");

router.get("/", (req, res, next) => {
  res.render("./home-search/home");
});

router.get("/askCourse/:id", async (req, res, next) => {
  try {   
    console.log("XXXXXXXXXXXXXXXXXXXX") 
    console.log(req.params.id);
    const userToBook = await UserModel.findById(req.params.id).populate("skills")
    console.log(userToBook.skills)
    console.log(userToBook.skills[0]._id) //id du skill
    
    console.log(userToBook._id) //id du mec
    console.log("la")
    const skillsToBook = await SkillsModel.findById(userToBook.skills[0]._id)
    console.log(skillsToBook)
    // Création d'un clone pour modifier les infos
    const {_doc: clone } = {...skillsToBook}
    console.log("dang");
    console.log(req.body) // rien dedans



    // version pas chantier
    const userToBook = await UserModel.findById(req.params.id).populate("skills")
    const skillsToBook = await SkillsModel.findById(userToBook.skills[0]._id)
    const bookExchange = await ExchangesModel.find({ teacher : req.params.id, student : req.session.currentUser._id, skillsName : userToBook.skills[0]._id ) //pas besoin de cloner je pense qu'on peut le faire direct
    

    
    // CREATION de l'exchange
    clone.teacher = req.params.id;
    clone.student =  req.session.currentUser._id;
    clone.skillsName = userToBook.skills[0]._id ;
    clone.exchangeStatus = "in progress";
    // fin creation

    
    if(req.session.currentUser) {
      
      res.redirect("/profile");
    } else {
      res.redirect("/auth/signin")
    }
    
  } catch (error) {
    next(error)
  }
})

// const courseToRebook = await ExchangesModel.findById(req.params.id);
//     const {_doc: clone} = {...courseToRebook};
//     delete clone._id;
//     clone.exchangeStatus = "in progress"
//     console.log(clone);
//     await ExchangesModel.create(clone)

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