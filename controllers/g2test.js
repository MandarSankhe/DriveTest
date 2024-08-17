const Users = require("../models/userModel");
const appointmentModel = require('../models/appointmentModel');
const bcrypt = require("bcrypt");
module.exports = async (req, res) => {

    try {
        const licno = req.session.licenseNumber;
        const userId = req.session.userId;

        //getting the users by ID
        const users = await Users.findById(userId).populate('appointmentId');

        //getting current date
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
        const day = currentDate.getDate().toString().padStart(2, '0');

        const date = `${year}-${month}-${day}`;

        let bookedTimes = [];
        const bookings = await appointmentModel.find({
            date: date,
            isTimeSlotAvailable: true
        }).select('time -_id');
        bookedTimes = bookings.map(booking => booking.time);

        // Sort bookedTimes in ascending order
        bookedTimes.sort((a, b) => {
            const timeA = a.split(':');
            const timeB = b.split(':');
            return (timeA[0] - timeB[0]) || (timeA[1] - timeB[1]);
        });

        res.render('g2test', { licno, users, date, data:[], bookedTimes });

    } catch (error) {
        console.log(error);
        console.error(error);
        res.status(500).send('Internal Server Error');
    }




}