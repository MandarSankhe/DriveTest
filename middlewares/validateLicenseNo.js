function validateLicenseNo(licenseNo) {
    // Regular expression for Ontario driving license format (Alphabet followed by 14 digits)
    const regex = /^[A-Za-z][0-9]{14}$/;
    return regex.test(licenseNo);
}


module.exports = (req, res, next) => {
    const { licno } = req.body;

    // Validation logic
    if (!licno || !validateLicenseNo(licno)) {
        req.validationError = "Invalid license number format. Ontario license number format is one Alphabet followed by 14 digits.";
        return next(); // Continue to controller for handling
    }

    // Valid license number, continue to next middleware
    next();
};