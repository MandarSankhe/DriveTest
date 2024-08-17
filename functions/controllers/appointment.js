const User = require("../models/userModel");

module.exports = async (req, res) => {
  let date = "";

  //get flash message if there is any
  const data = req.flash("data")[0];
  const passedUsers = await User.find({ isPassed: true });
  const failedUsers = await User.find({ isPassed: false });
  //extract date from flash variable
  if (typeof data != "undefined") {
    date = data.date;
  }

  res.render("appointment", {
    errors: req.flash("validationErrors"), //get errors from flash variable
    date: date,
    passedUsers,
    failedUsers,
    bookedTimes: [],
  });
};
