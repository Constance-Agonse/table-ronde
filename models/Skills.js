const { Schema, model } = require("mongoose");


const SkillSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    level: {
        type: String,
        enum: ["starter", "elementary", "intermediate", "advanced", "expert"],
    },
    category: {
        type: String,
        enum: ["gardening", "sports", "mechanics", "music", "cooking", "computer science", "school homework", "other"],
    },

});


const SkillModel = model("skills", SkillSchema);
module.exports = SkillModel;