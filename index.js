const express = require("express");
const app = new express();
const expressSession = require("express-session");
const mongoose = require("mongoose");
const flash = require("connect-flash");

app.use(express.static("public"));
app.use(express.static("resources"));
app.set("view engine", "ejs");
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: "keyboard cat",
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // Milliseconds for 24 hours
    },
  })
);
app.use(flash());

//database connection
mongoose.connect(
  "mongodb+srv://mandarsankhe:mandar1231@cluster0.2y2ujpq.mongodb.net/drivetest?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true }
);

//Declare global variable to use for navigation
global.utype = null;
app.use("*", (req, res, next) => {
  utype = req.session.userType;
  next();
});

//get action controllers
const homeController = require("./controllers/home");
const g2testController = require("./controllers/g2test");
const gtestController = require("./controllers/gtest");
const loginController = require("./controllers/login");
const signUpController = require("./controllers/signUp");
const logout = require("./controllers/logout");
const appointmentController = require("./controllers/appointment");
const examinerController = require("./controllers/examiner");

//post action controllers
const saveDetailsController = require("./controllers/saveDetails");
const editDetailsController = require("./controllers/editDetails");
const saveUserCollectionController = require("./controllers/storeUser");
const userLoginController = require("./controllers/userLogin");
const addtimeslotController = require("./controllers/addtimeslot");
const updateTimesCheckboxController = require("./controllers/updateTimesCheckbox");
const getAvailableSlotController = require("./controllers/getAvailableSlot");
const getUserDetailsController = require("./controllers/getUserDetails");
const resultController = require("./controllers/setUserResult");
const examResultController = require("./controllers/examResult");

//middleware controllers
const redirectIfAuth = require("./middlewares/redirectIfAuth");
const validateUser = require("./middlewares/validateUser");
const validateLogin = require("./middlewares/validateLogin");
const validateLicenseNo = require("./middlewares/validateLicenseNo");
const checkUserAdminAccess = require("./middlewares/checkUserAdminAccess");
const checkUserExaminerAccess = require("./middlewares/checkUserExaminerAccess");
const checkUserDriverAccess = require("./middlewares/checkUserDriverAccess");

//Route to handle controller
app.get("/", homeController); //Loads home page (dashboard)
app.get("/g2test", checkUserDriverAccess, g2testController); //loads G2test page for Driver
app.get("/gtest", checkUserDriverAccess, gtestController); //Loads gtest page for Driver
app.get("/appointment", appointmentController); //loads appointment page for Admin
app.get("/login", redirectIfAuth, loginController); //Loads login page
app.get("/register", redirectIfAuth, signUpController); //Loads New user registration page
app.get("/examiner", checkUserExaminerAccess, examinerController); //loads page for examiner

app.post("/userData", validateLicenseNo, saveDetailsController); //saving the personal and car data on g2test page
app.post("/editDetails", editDetailsController); //editing car details
app.post(
  "/userCollection",
  redirectIfAuth,
  validateUser,
  saveUserCollectionController
); //store new user details
app.post("/userLogin", redirectIfAuth, validateLogin, userLoginController); //executes login
app.use("/logout", logout); //executes logout
app.post("/addSlot", checkUserAdminAccess, addtimeslotController); //adds timeslot in the collection
app.post(
  "/updateTimesCheckbox",
  checkUserAdminAccess,
  updateTimesCheckboxController
); //get stored timeslot data for Appointment page
app.post("/getAvailableSlot", getAvailableSlotController); //get stored timeslot data for G2test page
app.get("/users/:id", getUserDetailsController);
app.post("/resultData", resultController);
app.post("/examResult", checkUserAdminAccess, examResultController);
