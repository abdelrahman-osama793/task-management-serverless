const mongoose = require("mongoose");
const validator = require("validator");

// In order to take advantage of the middleware in the models
// it is preferred to create the Schema first and then pass it to the model
// We have two methods pre for doing something before and post for doing something after
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
      trim: true,
      lowercase: true,
      // Custom Validation using validate function in mongoDB and validator package
      validate(value) {
        if (!validator.isEmail(value)) {
          throw Error("Email is not correct");
        }
      },
    },
    age: {
      type: Number,
      default: 0,
      required: true,
      // Custom Validation using Validate function in mongoDB
      validate(value) {
        if (value < 0) {
          throw Error("Age must be positive Number");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
