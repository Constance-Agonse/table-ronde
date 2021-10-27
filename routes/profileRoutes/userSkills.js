const express = require("express");
const router = new express.Router();
const skillModel = require("./../../models/Skills");

const userModel = require("./../../models/Users");

// la route c'est /profile/skills



// //route pour créer des nouvelles skills DE MICHEL
// //attention, les skills create sont propres à chaque utilisateur car on set le niveau 
// router.get("/profile/:id([a-z0-9]{24})/skills/create", async function (req, res, next) {
//     res.render("skills.hbs", { skills });
// });

// router.post("/profile/:id([a-z0-9]{24})/skills/create", (req, res, next) => {
//     skillModel
//         .create(req.body)
//         .then((skill) => res.redirect("/skills"))
//         .catch(next);
// });


// router.post("/profile/:id([a-z0-9]{24})/skills/create", (req, res, next) => {
//     skillModel.create(req.body)
//     .then((skill) => {
//         res.redirect("skills")
//     })
//     .catch(() => res.render("skills.hbs"))
// })



//route pour afficher toutes les skills de Michel
router.get("/", async (req, res, next) => {
    try {
        const user = await userModel.findById(req.session.currentUser._id).populate('skills');
        res.render("profileViews/skills.hbs", { user });
    } catch (err) {
        next(err);
    }
});

// //route pour modifier la skill de Michel cliquée
// router.get("/profile/skills/:id([a-z0-9]{24})/update", async function (req, res, next) {
//     try {
//         const user = await userModel.findById(req.session.currentUser._id);
//         const skill = await skillModel.findById(req.params.id);
//         res.render("skillEdit.hbs", { skill: skill })
//     } catch (err) {
//         next(err);
//     }
// });


// router.post("/profile/skills/:id([a-z0-9]{24})/update", (req, res, next) => {
//     skillModel
//         .findByIdAndUpdate(req.params.id, req.body, { new: true })
//         .then((ok) => res.redirect("/skills.hbs"))
//         .catch(next);
// });

//route pour supprimer la skill cliquée de Michel


router.get('/delete/:id', async (req,res,next) => {
    try {

         await skillModel.findByIdAndDelete(req.params.id)
         console.log(req.params.id)
         res.redirect("/profile/skills")
        
    } catch (err) {
        next(err);
    }
})




// router.get("/delete/:id", (req, res, next) => {
//     productModel
//       .findByIdAndDelete(req.params.id)
//       .then((products) => res.redirect("/product"))
//       .catch(next);
//   });







module.exports = router;