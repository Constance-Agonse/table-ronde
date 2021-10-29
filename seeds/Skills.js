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
        category: "computerScience"
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
    },
    {
        name: "html",
        level: "expert",
        category: "computerScience"
    },
    {
        name: "css",
        level: "expert",
        category: "computerScience"
    },
    {
        name: "botanic",
        level: "expert",
        category: "gardening"
    },
    {
        name: "build a bird house",
        level: "expert",
        category: "do-it-yourself"
    },
    {
        name: "lasagnas like Paul",
        level: "expert",
        category: "cooking"
    },
    {
        name: "build a wooden bench ",
        level: "intermediate",
        category: "do-it-yourself"
    },
    {
        name: "psychology",
        level: "expert",
        category: "wellness"
    },

];



skillModel
    .deleteMany()
    .then(() => {
        skillModel.create(testSkill).then(() => {
            console.log('Skills are added');
            process.exit();
        })
    })
    .catch((err) => console.log("err", err));

