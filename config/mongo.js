const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/week-6-project-2", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) =>
    console.log(`Connected to Mongo! Database name:  "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));