const appointmentModel = require('../models/appointmentModel');
const Users = require("../models/userModel");

module.exports = async (req, res) => {
    const data = req.body;
    const userId = req.session.userId;

    // Parse the nested JSON string
    const parsedData = JSON.parse(data.data);
    
    //getting the users by ID
    const users = await Users.findById(userId);

    let bookedTimes = [];

    //check if selected date has timeslot values stored in database,
    // and if it has, then store all values in bookTimes array
    if (data.date) {
        const bookings = await appointmentModel.find({
            date: data.date,
            isTimeSlotAvailable: true
        }).select('time -_id');
        bookedTimes = bookings.map(booking => booking.time);

        // Sort bookedTimes in ascending order
        bookedTimes.sort((a, b) => {
            const timeA = a.split(':');
            const timeB = b.split(':');
            return (timeA[0] - timeB[0]) || (timeA[1] - timeB[1]);
        });
    }

    res.render('g2test', {
        errors: req.flash('validationErrors'),
        date: data.date,
        data: parsedData,
        bookedTimes: bookedTimes,
        licno: "Default",
        users: users
    });
};
