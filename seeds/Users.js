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
    rates : 5,
},
    {
    name : "Bob",
    nickname: "SuperBob",
    email : "bob@bob.com",
    phone : "515",
    password :"multipass",
    rates : 3,
},
    {
    name : "Tim",
    nickname: "SuperTim",
    email : "tim@tim.com",
    phone : "858",
    password :"multipass",
    rates : 4,
},
    {
    name : "John",
    nickname: "SuperJohn",
    email : "john@john.com",
    phone : "585",
    password :"multipass",
    rates : 5,
},
    {
    name : "MAx",
    nickname: "SuperMAx",
    email : "max@maxx.com",
    phone : "785",
    password :"multipass",
    rates : 1,
},
    {
    name : "Joe",
    nickname: "SuperJoe",
    email : "joe@joe.com",
    phone : "12",
    password :"multipass",
    rates : 2,
},
]

function createSeed(){
    return new Promise(async (resolve, reject) => {
    try {
        const selectSkills = await skillModel.find()
        userSeed.forEach((el) =>{
            
            el.skills = selectSkills[Math.floor(Math.random() * selectSkills.length)]._id
            resolve();

        });
    }catch(err){
        reject(err)
    }
    });
};

createSeed()
.then((r)=>{
    userModel
    .deleteMany()
    .then(() => {
        userModel.insertMany(userSeed).then((res) => {
            console.log("Users added");
            
            process.exit()
        } )
        
    }).catch((err) => console.log("err", err));
})

