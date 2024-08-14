let userSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    let userData = new userSchema(req.body);
    try {
      const isUserExist = await userSchema.findOne({
        email: req.body.email,
      });
      if (isUserExist) {
        res.status(401).json({
          success: false,
          message: "User alrady registered with this email",
        });
      } else {
        userData.password = await bcrypt.hash(req.body.password, salt);
        const user = await userData.save();
        res.status(201).json({
          success: true,
          message: "User successfully registered",
          user: user,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  userLogin: async (req, res) => {
    try {
      const userData = await userSchema.findOne({
        email: req.body.email,
      });
      if (userData) {
        const hashPassword = await bcrypt.compare(
          req.body.password,
          userData.password
        );
        if (userData && hashPassword) {
          const token = jwt.sign({ userData }, "hfhgffgh", {
            expiresIn: "1h",
          });
          res.status(200).json({
            success: true,
            message: "Login successfully",
            accessToken: token,
          });
        } else {
          res.status(401).json({
            success: false,
            message: "Invalid email or password",
          });
        }
      } else {
        res.status(403).json({
          success: false,
          message: "User is not registered with this email",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      console.log(req.user)
      const user = await userSchema.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json({
        success: true,
        message: "User update successfully",
        data :user
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
};
