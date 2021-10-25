const { Schema, model } = require("mongoose");

const exchangeSchema = new Schema({
  teacher: {
      type : Schema.Types.ObjectId,
      ref : "teacher"
  },
  student : {
    type : Schema.Types.ObjectId,
    ref : "student"
},
  skillsName: {
    type: Schema.Types.ObjectId,
    ref : "skills"
  },
  exchangeStatus : {
      type : String,
      enum : ["denied","in progess", "accepted", "done" ]
  }, 
  ratingTeacher : Number,
});
const exchangeModel = model("exchanges", exchangeSchema);
module.exports = exchangeModel;




