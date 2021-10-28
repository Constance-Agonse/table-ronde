const router = require("express").Router(); //besoin meme si il y a celui d'en haut ?

const UsersModel = require("./../../models/Users");
const SkillsModel = require("./../../models/Skills");
const ExchangesModel = require("./../../models/Exchanges");

// const buttonRebook = document.getElementsByClassName("rebooker"); // es ce que l'on sélectionne que le button

console.log("hey dream team");

// On cherche a récupérer l'id du profil de l'individu, pour récupérer tout ces échanges (ATTENTION IL FAUDRA ENSUITE SELECTIONNER UNIQUEMENT LES ECHANGES AYANT LE STATUT DE TERMINE)
router.get("/profile/:id/previousCourses", async (req, res, next) => {
  try {
    const exchanges = await ExchangesModel.findById(req.params.id);
    console.log(exchanges);
    
    res.render("profile/:id/previousCourses", { exchanges });
  } catch (err) {
    next(err);
  }
});

router.get("/profile/previousCourses", async (req, res, next) => {
  try {
    const user = await UsersModel.findById(req.session.currentUser._id);
    // on récupère les datas quand il est prof
    const isProf = await ExchangesModel.find({
      teacher: user._id,
      exchangeStatus: "done",
    }).populate("student skillsName");
    // on récupère les datas quand il est student
    const isStudent = await ExchangesModel.find({
      student: user._id,
      exchangeStatus: "done",
    }).populate("teacher skillsName");

    // Array of object
    console.log(user);
    res.render("profileViews/previousExchanges", { isProf, isStudent, user });
  } catch (err) {
    next(err);
  }
});

// A METTRE DANS LE ONCLICK ou alors utiliser un lien qui renvoie vers la page profile?
router.get("/profile/rebook/:id", async (req, res, next) => {
  // Comment faire pour garder toutes les memes infos sauf l'id et le statut?
  try {
    const courseToRebook = await ExchangesModel.findById(req.params.id);
    const {_doc: clone} = {...courseToRebook};
    delete clone._id;
    clone.exchangeStatus = "in progress"
    console.log(clone);
    await ExchangesModel.create(clone)
    res.redirect("/profile");
  } catch (err) {
      console.log("here", err)
    next(err);
  }
});

module.exports = router;
