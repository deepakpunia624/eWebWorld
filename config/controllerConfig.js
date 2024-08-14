const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/eWebWorld", {
  useNewUrlParser: "true",
});
mongoose.connection.on("error", (err) => {
  console.log("mongoose connection error", err);
});
mongoose.connection.on("connected", (res) => {
  console.log("mongoose connected successfully");
});
