"use strict";
const userControllers = require("./controllers/user");

module.exports.createCustomer = async (event) => {
  try {
    const response = await userControllers
      .createCustomer(event)
      .catch((error) => {
        throw error;
      });

    return { response };
  } catch (error) {
    return { error };
  }
};

module.exports.getCustomer = async (event) => {
  try {
    const response = await userControllers.getCustomer(event).catch((error) => {
      throw error;
    });
    console.log(response);

    return { response };
  } catch (error) {
    return error;
  }
};

module.exports.updateCustomer = async (event) => {
  try {
    const reponse = await userControllers
      .updateCustomer(event)
      .catch((error) => {
        throw error;
      });

    return { reponse };
  } catch (error) {
    return error;
  }
};

module.exports.deleteCustomer = async (event) => {
  try {
    const reponse = await userControllers
      .deleteCustomer(event)
      .catch((error) => {
        throw error;
      });

    return { reponse };
  } catch (error) {
    return error;
  }
};
