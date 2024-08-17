const Users = require("../models/userModel");
module.exports = async (req, res) => {
    try {
        let body = req.body;

        const id = body._id;

        //edit the car details of user based on userID
        const updatedUser = await Users.findByIdAndUpdate(id, {
            TestType: "G",
            car_details: {
                make: body.make,
                model: body.model,
                year: body.year,
                plateno: body.plate,
            },
        }, { new: true } // This option returns the updated document
        );

        res.render('gtest', {
            users: updatedUser, successMessage: 'Vehicle details updated successfully for user '
                + updatedUser.firstName + ' ' + updatedUser.lastName + '!'
        });
    } catch (error) {
        //handle error
        console.log(error)
    }
}