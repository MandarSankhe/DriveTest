const Users = require("../models/userModel");
module.exports = async (req, res, next) => {
    const { password, cnfpassword, username } = req.body;

    
    let errorMessage = null; // Initialize error message variable

    // Password Validation logic
    if (!password || !cnfpassword) {
        errorMessage = "Please enter both password and confirm password fields.";
    } else if (password !== cnfpassword) {
        errorMessage = "Passwords do not match.";
    } else if (password.length < 8) {
        errorMessage = "Password must be at least 8 characters long.";
    }

    // Check for duplicate username
    if (!errorMessage) {
        try {
            const existingUser = await Users.findOne({ username });
            if (existingUser) {
                errorMessage = "This username already exists. Please choose a different username.";
            }
        } catch (error) {
            console.error("Error checking for duplicate username:", error);
            //Handle potential database errors
            errorMessage = "An error occurred during registration. Please try again later.";
        }
    }

    // Handle errors and pass message to controller
    if (errorMessage) {
        req.validationError = errorMessage; // Store error message in request object
        return next(); // Continue to controller for handling
    }
    else {
        // Store success message in request object
        req.validationSuccess = "User Registration successful, Now please login with the proper credentials";
    }

    // Password is valid, continue to next middleware
    next();
};