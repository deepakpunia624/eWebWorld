const express = require("express");
require("./config/controllerConfig");
const user = require("./route/userRouter");
const app = express();

app.use(express.json());

app.use("/user", user);

app.listen(8000),
  () => {
    console.log("server is running on port 8000");
  };
