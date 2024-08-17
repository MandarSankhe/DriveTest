module.exports = (req, res) => {

    let userData = "";

    // Handle custom welcome message (Dynamic dashboard page)
    if (req.session.userName) {
        if (req.session.fullName == "Default Default")
            userData = req.session.userName;
        else
            userData = req.session.fullName;
    }

    res.render('index', { userData });
}