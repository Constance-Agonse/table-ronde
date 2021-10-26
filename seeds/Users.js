require("dotenv").config();
require("./../config/mongo.js");

const skillModel = require("./../models/Skills");
const userModel = require("./../models/Users.js");
const exchangeModel = require("./../models/Exchanges");

const userSeed = [
    {
    name : "Flo",
    nickname: "SuperFlo",
    email : "flo@flo.com",
    phone : "12",
    password :"multipass",
    rate : 5,
},
    {
    name : "Bob",
    nickname: "SuperBob",
    email : "bob@bob.com",
    phone : "515",
    password :"multipass",
    rate : 3,
},
    {
    name : "Tim",
    nickname: "SuperTim",
    email : "Tim@Tim.com",
    phone : "858",
    password :"multipass",
    rate : 4,
},
    {
    name : "John",
    nickname: "SuperJohn",
    email : "John@John.com",
    phone : "585",
    password :"multipass",
    rate : 5,
},
    {
    name : "MAx",
    nickname: "SuperMAx",
    email : "MAx@MAx.com",
    phone : "785",
    password :"multipass",
    rate : 1,
},
    {
    name : "Joe",
    nickname: "SuperJoe",
    email : "Joe@Joe.com",
    phone : "12",
    password :"multipass",
    rate : 2,
},
]

(async function createSeed(){
    try {
        const selectSkills = await skillModel.find()
        userSeed.forEach((el) =>{
            el.skills = selectSkills[Math.floor(Math.random() * selectSkills.length)]._id
        });
    }catch(err){
        console.log("error : ", (err))
    }

})

userModel
.deleteMany()
.then(() => {
    userModel.insertMany(userSeed).then(() => console.log("all good"))
}) .catch((err) => console.log("err", err));