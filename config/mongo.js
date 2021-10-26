const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/week-6-project-2", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) =>
<<<<<<< HEAD
    console.log(`Connected to Mongo! Database name:  "${x.connections[0].name}"`)
=======
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
>>>>>>> e29e263c1942a500ec272fd48dbffcd7fb2b0d84
  )
  .catch((err) => console.error("Error connecting to mongo", err));
