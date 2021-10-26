const { router } = require("../../app");
const router = new express.Router(); //besoin meme si il y a celui d'en haut ?

const UsersModel = require("./../../models/Users");
const SkillsModel = require("./../../models/Skills");
const ExchangesModel = require("./../../models/Exchanges");

console.log("hey dream team");

// On cherche a
router.get("/profile/:id/previousCourses", async (req, res, next) => {
    try{
        const exchanges = await ExchangesModel.findById(req.params.id);
        console.log(exchanges);
        res.render("profile/:id/previousCourses", {exchanges});
    } catch(err){
        next(err);
    }
})