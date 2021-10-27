const express = require('express');
const router = express.Router();
const UserModel = require('./../../models/Users');
const ExchangesModel = require("./../../models/Exchanges");


router.get('/settings', async (req,res,next) => {
    try {
        console.log(req.session.currentUser._id)
       const userInfo =  await UserModel.find({_id: req.session.currentUser._id});
       const teacherLength =  await ExchangesModel.find( {teacher : req.session.currentUser._id, exchangeStatus : "done"});
       const studentLength =  await ExchangesModel.find( {student : req.session.currentUser._id, exchangeStatus : "done"});
       
       const userHours = 1 + (teacherLength.length - studentLength.length);
       

       res.render('./profileViews/settings.hbs', {userInfo, userHours})
    } catch (err) {
        next(err);
    }
})

module.exports = router;