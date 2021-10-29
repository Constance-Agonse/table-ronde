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
    phone : "07 66 77 77 66",
    password :"multipass",
    rates : 5,
    profilPicture: '/img/profilepics/profilepic2.png'
},
    {
    name : "Bob",
    nickname: "SuperBob",
    email : "bob@bob.com",
    phone : "06 76 45 45 45",
    password :"multipass",
    rates : 3,
    profilPicture: '/img/profilepics/profilepic3.png'
},
    {
    name : "Tim",
    nickname: "SuperTim",
    email : "tim@tim.com",
    phone : "06 66 77 77 66",
    password :"multipass",
    rates : 4,
    profilPicture:'/img/profilepics/profilepic6.png'
},
    {
    name : "John",
    nickname: "SuperJohn",
    email : "john@john.com",
    phone : "06 66 66 66 66",
    password :"multipass",
    rates : 5,
    profilPicture:'/img/profilepics/profilepic3.png'
},
    {
    name : "Maxime",
    nickname: "SuperMax",
    email : "max@maxx.com",
    phone : "07 77 67 67 67",
    password :"multipass",
    rates : 1,
    profilPicture:'/img/profilepics/profilepic2.png'
},
{
    name : "Micheline",
    nickname: "SuperMicheline",
    email : "micheline@micheline.com",
    phone : "06 66 66 66 98",
    password :"multipass",
    rates : 2,
    profilPicture:'/img/profilepics/profilepic1.png'
},
{
    name : "Aurore",
    nickname: "Aurore",
    email : "aurore@aurore.com",
    phone : "06 66 77 77 77",
    password :"multipass",
    rates : 2,
    profilPicture:"/img/profilepics/profilepic5.png"
},
{
    name : "Isabella",
    nickname: "Isa",
    email : "isabella@isabella.com",
    phone : "06 88 88 88 88",
    password :"multipass",
    rates : 2,
    profilPicture:"/img/profilepics/profilepic4.png"
},
{
    name : "Yuki",
    nickname: "Yuki",
    email : "yuki@yuki.com",
    phone : "06 33 88 88 98",
    password :"multipass",
    rates : 2,
    profilPicture:"/img/profilepics/profilepic7.png"
},


    {
    name : "Joe",
    nickname: "SuperJoe",
    email : "joe@joe.com",
    phone : "06 88 88 88 88",
    password :"multipass",
    rates : 2,
    profilPicture:"/img/profilepics/profilepic2.png"
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

