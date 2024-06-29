const mongoose = require("mongoose");
const Campsite = require("./models/campsite");

const url = "mongodb://localhost:27017/nucampsite";

const connect = mongoose.connect(url, {});

connect.then(() => {
  console.log("Connected correctly to server");

  const newCampsite = new Campsite({
    name: "React Lake Campground",
    description: "test",
  });

  newCampsite
    .save()
    .then((campsite) => {
      console.log(campsite);
      //constructs a query to fetch all documents (campsite records) from the 'campsites' collection in the MongoDB database
      return Campsite.find();
    })
    .then((campsites) => {
      console.log(campsites);
      return Campsite.deleteMany();
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
      mongoose.connection.close();
    });
});
