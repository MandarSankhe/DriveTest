const Users = require("../models/userModel");
module.exports = async (req, res) => {

    try {
        const userId = req.session.userId;

        //getting the users by ID
        const users = await Users.findById(userId);
        res.render('gtest', { users });

    } catch (error) {
        console.log(error);
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

}