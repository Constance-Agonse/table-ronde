const express = require('express');
const router = express.Router();
const UserModel = require('./../../models/Users');
const ExchangesModel = require("./../../models/Exchanges");


router.get('/settings', async (req,res,next) => {
    try {
        console.log(req.session.currentUser._id)
       const userInfo =  await UserModel.find({_id: req.session.currentUser._id})
       console.log(userInfo[0])

       res.render('./profileViews/settings.hbs', {userInfo})
    } catch (err) {
        next(err);
    }
})

module.exports = router;