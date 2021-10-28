const express = require('express');
const router = express.Router();
const UserModel = require('./../../models/Users');
const ExchangesModel = require("./../../models/Exchanges");


router.get('/', async (req,res,next) => {
    try {
        console.log(req.session.currentUser._id);
        const user = await UserModel.findById(req.session.currentUser._id);
        const courseTaken =  await ExchangesModel.find({ teacher : req.session.currentUser._id, exchangeStatus : { $ne : "done" } }).populate("teacher").populate("skillsName")
        const courseGiven =  await ExchangesModel.find({ student : req.session.currentUser._id, exchangeStatus : { $ne : "done" } }).populate("teacher").populate("skillsName")
        // console.log(courseTaken);
        
        console.log(courseTaken);

        res.render("./profileViews/profile.hbs", {courseTaken, courseGiven, user})
    } catch (err) {
        next(err);
    }
})



router.get('/finished/lessontaken/:id', async (req,res,next) => {
    try {
        console.log("===^^^^^^^^====");
        console.log(req.params.id);
        const updateStatus =  await ExchangesModel.findByIdAndUpdate(req.params.id, { exchangeStatus : "done" }, { new: true})
        console.log("==========================updateStatus");
        console.log(updateStatus);
        console.log("==========================");
        res.redirect("/profile")
        
    } catch (err) {
        next(err);
    }
})


router.get('/cancel/lessontaken/:id', async (req,res,next) => {
    try {
        const updateStatus =  await ExchangesModel.findByIdAndUpdate(req.params.id, { exchangeStatus : "denied" }, { new: true})
         res.redirect("/profile")
        
    } catch (err) {
        next(err);
    }
})

router.get('/approve/lessongiven/:id', async (req,res,next) => {
    try {
        console.log("===^^^^^^^^====");
        console.log(req.params.id);
        const updateStatus =  await ExchangesModel.findByIdAndUpdate(req.params.id, { exchangeStatus : "accepted" }, { new: true})
        console.log("==========================updateStatus");
        console.log(updateStatus);
        console.log("==========================");
        res.redirect("/profile")
        
    } catch (err) {
        next(err);
    }
})

router.get('/cancel/lessongiven/:id', async (req,res,next) => {
    try {
        const updateStatus =  await ExchangesModel.findByIdAndUpdate(req.params.id, { exchangeStatus : "denied" }, { new: true})
         res.redirect("/profile")
        
    } catch (err) {
        next(err);
    }
})

module.exports = router;