const express = require("express");
const router = new express.Router();
const skillModel = require("./../../models/Skills");

const userModel = require("./../../models/Users");



//route pour créer des nouvelles skills DE MICHEL
//attention, les skills create sont propres à chaque utilisateur car on set le niveau 
router.get("/profile/:id([a-z0-9]{24})/skills/create", async function (req, res, next) {
    res.render("skills.hbs", {skills});
});

router.post("/profile/:id([a-z0-9]{24})/skills/create", (req, res, next) => {
    skillModel
      .create(req.body)
      .then((skill) => res.redirect("/skills"))
      .catch(next);
  });


// router.post("/profile/:id([a-z0-9]{24})/skills/create", (req, res, next) => {
//     skillModel.create(req.body)
//     .then((skill) => {
//         res.redirect("skills")
//     })
//     .catch(() => res.render("skills.hbs"))
// })



//route pour afficher toutes les skills de Michel
router.get("/profile/:id([a-z0-9]{24})/skills", async (req, res, next) => {
    try {

      res.render("skills.hbs", { skills: await skillModel.find() });
    } catch (err) {
      next(err);
    }
  });

//route pour modifier la skill de Michel cliquée

router.get("/profile/:id([a-z0-9]{24})/skills/:id([a-z0-9]{24})/update", async function (req, res, next) {
    try {
      res.render("skillEdit.hbs", {
        skill: await skillModel.findById(req.params.id),
      });
    } catch (err) {
      next(err);
    }
  });

router.post("/profile/:id([a-z0-9]{24})/skills/:id([a-z0-9]{24})/update", (req, res, next) => {
    skillModel
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((ok) => res.redirect("/skills.hbs"))
      .catch(next);
  });
  

  





//route pour supprimer la skill cliquée de Michel
router.get("/profile/:id([a-z0-9]{24})/skills/:id([a-z0-9]{24})/delete", (req, res, next) => {
    skillModel.findByIdAndRemove(req.params.id)
      .then(() => res.redirect("/profile/:id([a-z0-9]{24})/skills"))
      .catch(next);
  });

  module.exports = router;