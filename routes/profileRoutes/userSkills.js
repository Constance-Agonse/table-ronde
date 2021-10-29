const express = require("express");
const router = new express.Router();
const skillModel = require("./../../models/Skills");
const userModel = require("./../../models/Users");
const protectRoute = require("./../../middlewares/protectRoute")

// la route est préfixée avec /profile/skills dans app.js

//route pour afficher toutes les skills de Michel
router.get("/",protectRoute, async (req, res, next) => {
    try {
        const user = await userModel.findById(req.session.currentUser._id).populate('skills');

        res.render("profileViews/skills.hbs", { user, page: 'skills' });
    } catch (err) {
        next(err);
    }
});

// //route pour créer des nouvelles skills DE MICHEL
// //attention, les skills create sont propres à chaque utilisateur car on set le niveau 


router.get("/create",protectRoute, async  (req, res, next) => {
    try{
    const user = await userModel.findById(req.session.currentUser._id);
    res.render("profileViews/skillCreate.hbs", {user} )}
    catch (err){
        next(err);
    }
});

router.post("/create",protectRoute, async (req, res, next) => {
    try {
        const newSkill = await skillModel.create(req.body)
        const user = await userModel.findByIdAndUpdate(req.session.currentUser._id, { $push: { skills: newSkill._id } }, { new: true })
        console.log(user)
        res.redirect("/profile/skills")
    } catch (err) {
        next(err);
    }
});

// //route pour modifier la skill de Michel cliquée


router.get("/edit/:id",protectRoute, async  (req, res, next)  => {
    try {
        const skill = await skillModel.findById(req.params.id);
        res.render("profileViews/skillEdit.hbs", { skill })
    } catch (err) {
        next(err);
    }
});

router.post("/edit/:id", async  (req, res, next) =>{
    try{
        await skillModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.redirect("/profile/skills")
    }catch (err) {
        next(err);
      }
});


//route pour supprimer la skill cliquée de Michel
router.get('/delete/:id',protectRoute, async (req, res, next) => {
    try {

        await skillModel.findByIdAndDelete(req.params.id)
        console.log(req.params.id)
        res.redirect("/profile/skills")

    } catch (err) {
        next(err);
    }
})




module.exports = router;