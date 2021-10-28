const express = require("express");
const router = express.Router();
const UserModel = require("../models/Users");
const ExchangesModel = require("../models/Exchanges");
const SkillsModel = require("../models/Skills");

const skillsConvert = (currentValue) => {
  const vals = [{ order: 0, name: "starter" }, { order: 1, name: "elementary" }, {  order: 2, name: "intermediate" }, {  order: 3, name: "advanced" }, {  order: 4, name: "expert" }];

  const found = vals.find((el) => el.name === currentValue);
  const index = vals.indexOf(found);
  if(index < 4 ) {
    return ["starter", "elementary", "intermediate", "advanced", "expert" ];
  } else if (index < 3) {
    return ["starter", "elementary", "intermediate", "advanced"]
  } else if (index < 2) {
    return ["starter", "elementary", "intermediate"]
  } else if (index < 1) {
    return ["starter", "elementary", "intermediate"]
  }
};

router.get("/", (req, res, next) => {
  res.render("./home-search/home");
});

router.get("/search", async function (req, res, next) {
  //   const regexp = new RegExp(req.query.search, "ig");

  const regexp = new RegExp(req.query.search, "ig");
  try {
    const test = await UserModel.find().populate({
      path: "skills",
      match: {
        name: { $regex: regexp },       
      },      
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
    console.log(test3[0].skills);

    

    res.json(test3);

   
  } catch (err) {
    next(err);
  }
});

module.exports = router;
