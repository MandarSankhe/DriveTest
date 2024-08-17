
const userModel = require('../models/userModel');

module.exports = async (req, res) => {
    try {
        const errorMessage = req.validationError;
        const successMessage = req.validationSuccess;
        if (errorMessage) {
            // Handle validation error on UI (e.g., render registration page with error message)
            console.error("Registration Error:", errorMessage); // Log error for debugging

            // Pass the errorMessage to the view template using res.render(...)
            return res.render("signUp", { errorMessage }); // Replace with your view rendering logic
        }

        console.log("===req.body", req.body);
        const user = await userModel.create(req.body);
        console.log("===user", user);
        res.render('login', { successMessage });

    } catch (error) {
        console.log("===error while creating user", error);
        res.status(500).send('An Error occured during user creation');
    }
}