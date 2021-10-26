const { Schema, model } = require("mongoose");

const exchangeSchema = new Schema({
  teacher: {
      type : Schema.Types.ObjectId,
      ref : "users"
  },
  student : {
    type : Schema.Types.ObjectId,
    ref : "users"
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




