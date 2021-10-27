const express = require('express');
const router = express.Router();
const UserModel = require('./../../models/Users');
const ExchangesModel = require("./../../models/Exchanges");


router.get('/', async (req,res,next) => {
    try {
        console.log(req.session.currentUser._id);
        
        const courseTaken =  await ExchangesModel.find({ teacher : req.session.currentUser._id, exchangeStatus : { $ne : "done" } }).populate("teacher").populate("skillsName")
        const courseGiven =  await ExchangesModel.find({ student : req.session.currentUser._id, exchangeStatus : { $ne : "done" } }).populate("teacher").populate("skillsName")
        // console.log(courseTaken);
        
        console.log(courseTaken);

        res.render("./profileViews/profile.hbs", {courseTaken, courseGiven})
    } catch (err) {
        next(err);
    }
})

router.get('/delete/coursegiven/:id', async (req,res,next) => {
    try {
         await ExchangesModel.findByIdAndDelete({ _id : req.params.id})
         res.redirect("/profile")
        
    } catch (err) {
        next(err);
    }
})

router.get('/delete/coursetaken/:id', async (req,res,next) => {
    try {
         await ExchangesModel.findByIdAndDelete({ _id : req.params.id})
         res.redirect("/profile")
        
    } catch (err) {
        next(err);
    }
})

module.exports = router;