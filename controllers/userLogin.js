const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    const errorMessage = req.session.errorMessage;

    if (username == "" || password == "") {
      res.render("login", { errorMessage });
    }
    else if (user) {
      const comparePassword = await bcrypt.compare(password, user.password);
      if (comparePassword) {
        // open user session
        req.session.userType = user.userType;
        req.session.userId = user._id;
        req.session.licenseNumber = user.licenseNumber;

        //send details to show on Dashboard
        req.session.userName = user.username;
        req.session.fullName = user.firstName + " " + user.lastName;
        res.redirect("/");
      } else {
        //if username is right, but password is wrong, which means this user is already registered,
        //so redirect to same page to enter the correct password
        res.render("login", { errorMessage });
      }
    } else {
      //if username is wrong, which means this user is yet to register,
      //so redirect to register page
      res.render("signUp", { errorMessage });
    }
  } catch (error) {
    console.log("===error while creating user", error);
    res.status(500).send("An Error occured during user creation");
  }
};
