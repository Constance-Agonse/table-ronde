const express = require("express");
const router = express.Router();
const UserModel = require("../models/Users");
const ExchangesModel = require("../models/Exchanges");
const SkillsModel = require("../models/Skills");


router.get("/", (req, res, next) => {
  res.render("./home-search/home");
});

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
    case "expert":
      skillFilter = { $or: [{ level: "advanced" }, { level: "expert" }] };
      break;
    case "expert":
      skillFilter = { level: "expert" };
      break;

    default:
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
    test.forEach(function (result) {
      if (result.skills.length) {
        console.log("//////111//////")        
        console.log(result)
        console.log("//////222//////")        


        console.log("******1*****")        
        console.log(result.skills[0])
        console.log("*****2******")
        result.skills.forEach((skill) => {
          console.log("AAAAAAAAAAAAAAAAA")
          if(skill.level === "starter"){
            test3.push(result);
            console.log("added")
          } else {
            console.log("not added")
          }
          
        })
        // if(result.skills[0].level === "expert"){
        //   console.log("*****3******")
        // console.log(result)          
        // }
        
        
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
