const Users = require("../models/userModel");
const Appointments = require("../models/appointmentModel");
const bcrypt = require("bcrypt");
module.exports = async (req, res) => {

    const errorMessage = req.validationError;
    const licno = req.session.licenseNumber;
    const userId = req.session.userId;
    const users = await Users.findById(userId);

    if (errorMessage) {
        // Handle validation error on UI (e.g., render registration page with error message)
        console.error("Registration Error:", errorMessage); // Log error for debugging
        // Pass the errorMessage to the view template
        return res.render("g2test", { errorMessage, data:[], date:"",bookedTimes: [], licno, users }); // Replace with your view rendering logic
    }

    try {
        let body = req.body;
        const userId = req.session.userId;

        // Find the appointment and update its availability
        const appointment = await Appointments.findOneAndUpdate(
            { date: body.date, time: body.time },
            { isTimeSlotAvailable: false },
            { new: true }
        );

        // Encrypt the license number
        const hashedLicenseNumber = await bcrypt.hash(body.licno, 10);

        //edit users details (personal and car details) based on userID
        //this will execute only one time per user
        const users = await Users.findByIdAndUpdate(userId, {
            firstName: body.fname,
            lastName: body.lname,
            licenseNumber: hashedLicenseNumber,
            age: body.age,
            appointmentId: appointment._id,
            TestType: "G2",
            car_details: {
                make: body.make,
                model: body.model,
                year: body.year,
                plateno: body.plate,
            },
        }, { new: true },

            req.session.licenseNumber = hashedLicenseNumber,
            req.session.fullName = body.fname + " " + body.lname  //for dynamic dashboard welcome message

        )
        res.redirect('/home')
    } catch (error) {
        //handle error
        console.log(error)
    }
}