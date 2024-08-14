const express = require("express");
const user = require("../controller/userController");
const { userAuthetication } = require("../middleware/authToken");

const router = express.Router();

router.post("/create", user.createUser);
router.post("/sign-in", user.userLogin);
router.patch("/update/:id", userAuthetication, user.updateUser);

module.exports = router;
