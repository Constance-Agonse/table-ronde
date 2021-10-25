const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
);

mongoose.connection.on("error", () =>
    console.error("Error connecting to mongo")
);
