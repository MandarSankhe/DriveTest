
const appointmentModel = require('../models/appointmentModel');

module.exports = async (req, res) => {
    try {

        const { date, time } = req.body;

        // Check if time is an array
        if (Array.isArray(time)) {
            const appointments = time.map(t => ({ date, time: t }));
            await appointmentModel.insertMany(appointments);
        } else {
            const appointment = await appointmentModel.create({ date, time });
        }

        res.redirect('/appointment');

    } catch (error) {
        if (error.name === 'ValidationError') {
            // Mongoose validation error
            const validationErrors = Object.values(error.errors).map(err => err.message);
           
            req.flash('validationErrors', validationErrors);
            req.flash('data', req.body)
            return res.redirect('/appointment');
        } else if (error.name === 'MongoServerError') {
            // Mongoose database error (e.g., duplicate key)
            req.flash('validationErrors', error.errmsg);
            req.flash('data', req.body)
            return res.redirect('/appointment');
        } else {
            // Other errors
            console.error(error);
            res.status(500).send('An Error occurred during appointment creation');
        }
    }
}