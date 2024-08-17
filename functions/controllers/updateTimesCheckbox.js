const appointmentModel = require('../models/appointmentModel');
const User = require('../models/userModel');

module.exports = async (req, res) => {
    const selectedDate = req?.body?.date; //get selected date from view
    let bookedTimes = [];

    //check if selected date has timeslot values stored in database,
    // and if it has, then store all values in bookTimes array
    if (selectedDate) {
        const bookings = await appointmentModel.find({ date: selectedDate }).select('time -_id');
        bookedTimes = bookings.map(booking => booking.time);
    }

    const passedUsers = await User.find({ isPassed: true });
    const failedUsers = await User.find({ isPassed: false });

    res.render('appointment', {
        errors: req.flash('validationErrors'),
        date: selectedDate,
        bookedTimes: bookedTimes,
        passedUsers,
        failedUsers
    });
};
