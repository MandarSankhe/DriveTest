const User = require("../models/userModel"); // Assuming your user model
const bcrypt = require("bcrypt"); // Include bcrypt for password comparison

module.exports = async (req, res, next) => {
    const { username, password } = req.body;

    // Validation logic (optional)
    let errorMessage = null;
    if (!username || !password) {
        errorMessage = "Please enter both username and password.";
    }

    // Check for errors
    if (errorMessage) {
        req.session.errorMessage = errorMessage;
        return next(); // Continue to controller for handling
    }

    try {
        // Find user by username
        const user = await User.findOne({ username });

        // Check if user exists
        if (!user) {
            errorMessage = "This user name does not exist. Register new user on this page.";
        } else {
            // Compare password with hashed password (using bcrypt)
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                errorMessage = "Invalid password.";
            }
        }
    } catch (error) {
        console.error("Error during login:", error);
        errorMessage = "An error occurred during login. Please try again later.";
    }

    // Handle errors and success (assuming successful login)
    if (errorMessage) {
        req.session.errorMessage = errorMessage;

    } else {
        req.session.errorMessage = "";
    }


    next(); // Continue to controller for further processing
};
