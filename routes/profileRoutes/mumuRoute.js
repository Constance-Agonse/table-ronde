const express = require('express');
const router = express.Router();
const UserModel = require('./../../models/Users')


router.get('/:id/settings', async (req,res,next) => {
    try {
        console.log(req.params.id)
       const userInfo =  await UserModel.findById(req.params.id)
       console.log(userInfo)

       res.render('./profileViews/settings.hbs', {userInfo})
    } catch (err) {
        next(err);
    }
})

module.exports = router;