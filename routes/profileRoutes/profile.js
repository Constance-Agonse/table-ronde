const express = require('express');
const router = express.Router();
const UserModel = require('./../../models/Users');
const ExchangesModel = require("./../../models/Exchanges");
const protectRoute = require("./../../middlewares/protectRoute")


router.get('/',protectRoute, async (req,res,next) => {

    console.log(res.locals.isLoggedIn);
    try {
        console.log(req.session.currentUser._id);
        const user = await UserModel.findById(req.session.currentUser._id);
        const courseTaken =  await ExchangesModel.find({ teacher : req.session.currentUser._id, exchangeStatus : { $ne : "done" } }).populate("student").populate("skillsName")
        const courseGiven =  await ExchangesModel.find({ student : req.session.currentUser._id, exchangeStatus : { $ne : "done" } }).populate("teacher").populate("skillsName")
        // console.log(courseTaken);


        res.render("./profileViews/profile.hbs", {courseTaken, courseGiven, user, page: 'profile' })
    } catch (err) {
        next(err);
    }
})



router.get('/finished/lessontaken/:id',protectRoute, async (req,res,next) => {
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


router.get('/cancel/lessontaken/:id',protectRoute, async (req,res,next) => {
    try {
        const updateStatus =  await ExchangesModel.findByIdAndUpdate(req.params.id, { exchangeStatus : "denied" }, { new: true})
         res.redirect("/profile")
        
    } catch (err) {
        next(err);
    }
})

router.get('/approve/lessongiven/:id',protectRoute, async (req,res,next) => {
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

router.get('/cancel/lessongiven/:id',protectRoute, async (req,res,next) => {
    try {
        const updateStatus =  await ExchangesModel.findByIdAndUpdate(req.params.id, { exchangeStatus : "denied" }, { new: true})
         res.redirect("/profile")  
    } catch (err) {
        next(err);
    }
})

module.exports = router;