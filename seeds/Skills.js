require("dotenv").config();
require("./../config/mongo.js");
const skillModel = require("../models/Skills");

const testSkill = [
    {
        name: "guitar",
        level: "intermediate",
        category: "music"
    },
    {
        name: "javascript",
        level: "intermediate",
        category: "computer science"
    },
    {
        name: "yoga",
        level: "expert",
        category: "sports"
    },
    {
        name: "pilate",
        level: "intermediate",
        category: "sports"
    },
    {
        name: "pastry",
        level: "expert",
        category: "cooking"
    }
];



skillModel
    .deleteMany()
    .then(() => {
        skillModel.create(testSkill).then(() => {
            console.log('Skills are added');
        })
    })
    .catch((err) => console.log("err", err));

