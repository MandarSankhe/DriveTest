const mongoose = require("mongoose");
const Users = require("./models/userModel");

mongoose.connect(
  "mongodb+srv://mandarsankhe:mandar1231@cluster0.2y2ujpq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true }
);

async function createUser(first, last, license, age) {
  try {
    const user = await Users.create({
      firstName: first,
      lastName: last,
      licenseNumber: license,
      age: age,
      car_details: {
        make: "kasf",
        model: "weg",
        year: "ewg",
        plateno: "weg",
      },
    });
    console.log(user);
  } catch (error) {
    console.log(error);
  }
}

createUser("Mandar", "Sankhe", "8369UBDI", 27);

async function readUser() {
  try {
    const users = await Users.find({});
    console.log(users);
  } catch (error) {
    console.log(error);
  }
}
//readUser();

async function updateUser() {
  try {
    const id = "6656708160e14b6bb4d17e22";
    const updatedUser = await Users.findByIdAndUpdate(id, {
      title: "Updated title",
    });
    console.log(updatedUser);
  } catch (error) {
    console.log(error);
  }
}
//updateUser();