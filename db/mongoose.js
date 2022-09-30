const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

const connectionURL =
  "mongodb+srv://abood:admin@cluster0.pnma7.mongodb.net/serverless-api?retryWrites=true&w=majority";

module.exports.connectToBD = () => {
  return mongoose
    .connect(connectionURL)
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.log("Unable to Connect");
      console.log(error);
    });
};
