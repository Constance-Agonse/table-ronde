const router = require('express').Router(); //besoin meme si il y a celui d'en haut ?

const UsersModel = require("./../../models/Users");
const SkillsModel = require("./../../models/Skills");
const ExchangesModel = require("./../../models/Exchanges");

console.log("hey dream team");

// On cherche a récupérer l'id du profil de l'individu, pour récupérer tout ces échanges (ATTENTION IL FAUDRA ENSUITE SELECTIONNER UNIQUEMENT LES ECHANGES AYANT LE STATUT DE TERMINE)
router.get("/profile/:id/previousCourses", async (req, res, next) => {
    try{
        const exchanges = await ExchangesModel.findById(req.params.id);
        console.log(exchanges);
        res.render("profile/:id/previousCourses", {exchanges});
    } catch(err){
        next(err);
    }
})

router.get('/profile/previousCourses' , async (req, res, next) => {
    try {
        const user = await UsersModel.findById(req.session.currentUser._id)
        const isProf = await ExchangesModel.find({teacher: user._id}).populate('student skillsName')
        // Array of object
        console.log(user)
        res.render('profileViews/previousExchanges', {isProf})
    } catch(err) {
        next(err)
    }
})

module.exports = router