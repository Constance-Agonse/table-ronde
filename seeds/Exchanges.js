require("dotenv").config();
require("./../../config/mongo.js");

const userModel = require("../models/Users.js");
const exchangeModel = require("./../models/Exchanges");
const skillModel = require("./../models/Skills");

const exchangeSeed = [
  {  exchangeStatus : "in progess" },
  
];

(async function createSeed(){
    try {
        const user = await userModel.find()
        const skills = await skillModel.find()
        exchangeSeed.forEach((el) => {
            el.teacher = user[Math.floor(Math.random() * user.length)]._id
            el.student = user[Math.floor(Math.random() * user.length)]._id
            el.skillsName = user[Math.floor(Math.random() * skills.length)]._id
        })
    } catch(err){
        console.log("error : ", (err))
    }
} )()

exchangeModel
  .deleteMany()
  .then(() => {
    exchangeModel.insertMany(exchangeSeed).then((ok) => console.log("ok"));
  })
  .catch((err) => console.log("err", err));