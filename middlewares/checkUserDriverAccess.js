const User = require("../models/userModel");

// Middleware to protect routes
module.exports = (req, res, next) => {
  // Check if user is logged in and userType is Driver
  if (req?.session?.userId) {
    User.findById(req.session.userId)
      .then((user) => {
        if (user && user?.userType == "driver") {
          // User is authorized, proceed to next middleware or route handler
          req.user = user;
          next();
        } else {
          // User is not authorized, redirect to login or handle unauthorized access
          res.redirect("/login"); // Redirect to login page or handle unauthorized access
        }
      })
      .catch((err) => {
        console.error("Error checking user type:", err);
        res.redirect("/login"); // Redirect to login page or handle errors
      });
  } else {
    // User is not logged in, redirect to login page
    res.redirect("/login");
  }
};
