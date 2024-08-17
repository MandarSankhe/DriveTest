const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const usersSchema = new Schema({
  firstName: {
    type: String,
    default: "Default", // Default value if not supplied
  },
  lastName: {
    type: String,
    default: "Default", // Default value if not supplied
  },
  licenseNumber: {
    type: String,
    default: "Default", // Default value if not supplied
  },
  age: {
    type: Number,
    default: 0, // Default value if not supplied
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    enum: ["driver", "examiner", "admin"], // Define allowed user types
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "appointmentModel",
  },
  TestType: {
    type: String,
    default: "Default", // Default value if not supplied
  },
  Comments: {
    type: String,
  },
  isPassed: {
    type: Boolean,
  },
  car_details: {
    make: {
      type: String,
      default: "Default", // Default value if not supplied
    },
    model: {
      type: String,
      default: "Default", // Default value if not supplied
    },
    year: {
      type: String,
      default: "Default", // Default value if not supplied
    },
    plateno: {
      type: String,
      default: "Default", // Default value if not supplied
    },
  },
});

//encrypt the password

//we will encrypt licenseNumber on saveDetails controller, so it does not encrypt the default value
//(we are gonna need default value in our view to comapare on G2 page)
usersSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

const usersData = mongoose.model("userModel", usersSchema);
module.exports = usersData;
