const express = require('express');
const router = express.Router();
const UserModel = require('../models/Users');
const ExchangesModel = require("../models/Exchanges");
const SkillsModel = require("../models/Skills");



router.get("/",  (req,res,next) =>{
    res.render("./home-search/home")
})


router.get("/search", async function (req, res, next) {
    try {
        const test = await UserModel.findOne().populate("skills")
        console.log("===========");
        console.log(test.skills);
       
    } catch (error) {
        
    }
    // console.log("=====");
    // console.log(req.query.search)
    // const regexp = new RegExp(req.query.search, "ig");
    // console.log(regexp);
    // {skills: `"${req.query.search}"` 
    //       }

    // const test = UserModel
    // .find({skills: { $regex: regexp } 
    //   })
    //   .then((dbRes) => {
    //     console.log("=====");
    //     console.log(test);
    //     res.json(dbRes)} )
    //   .catch(next);
  });



module.exports = router;