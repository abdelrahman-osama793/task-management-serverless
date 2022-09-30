"use strict";
const { connectToBD } = require("../db/mongoose");
const UserModel = require("../models/user");
const userControllor = {};

userControllor.createCustomer = async (event) => {
  console.log("started userControllor.createCustomer");

  return new Promise(async (resolve) => {
    const data = JSON.parse(event.body);
    let createdUser = new UserModel(data);

    try {
      await connectToBD();
      await createdUser.save().catch((error) => {
        console.log("something wrong happened while saving the user", error);
        throw error;
      });

      resolve({
        statusCode: 200,
        message: "User created successfully",
        id: createdUser.id,
      });
    } catch (e) {
      if (e.code === 11000 && e.keyPattern.email === 1) {
        console.log("an error happened in signup function");
        reject(e);
        return;
      }

      reject(e);
    }
  });
};

userControllor.getCustomer = async (event) => {
  console.log("Started userControllor.getCustomer");

  return new Promise(async (resolve) => {
    const id = event.pathParameters.id;

    try {
      await connectToBD();
      const user = await UserModel.findById(id).catch((error) => {
        console.log("something wrong happened while getting the user", error);
        throw error;
      });

      if (user === null) {
        throw new Error({
          statusCode: 404,
          message: "User not found",
        });
      }

      resolve({
        statusCode: 200,
        message: "User Found successfully",
        user,
      });
    } catch (e) {
      reject(e);
    }
  });
};

userControllor.updateCustomer = async (event) => {
  console.log("Started userControllor.updateCustomer");

  return new Promise(async (resolve) => {
    const data = JSON.parse(event.body);
    const id = event.pathParameters.id;

    try {
      await connectToBD();
      let user = await UserModel.findByIdAndUpdate(id, data).catch((error) => {
        console.log("something wrong happened while updating the user", error);
        throw error;
      });

      resolve({
        statusCode: 200,
        message: "User updated successfully",
        user,
      });
    } catch (e) {
      reject(e);
    }
  });
};

userControllor.deleteCustomer = async (event) => {
  console.log("Started userControllor.deleteCustomer");

  return new Promise(async (resolve) => {
    const id = event.pathParameters.id;

    try {
      await connectToBD();
      await UserModel.findByIdAndDelete(id).catch((error) => {
        console.log("something wrong happened while deleting the user", error);
        throw error;
      });

      resolve({
        statusCode: 200,
        message: "User removed successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = userControllor;
