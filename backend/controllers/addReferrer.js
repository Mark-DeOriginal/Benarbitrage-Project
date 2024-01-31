import db from "../config/database.js";
import initModels from "../models/init-models.js";
import generateId from "../utilities/generateId.js";

const sequelize = db;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to database was successful!");
  })
  .catch((error) => {
    console.error("Unable to connect to the database.", error);
  });

// Get this Model
const { referrers } = initModels();

// Checks if the email already exists
const isEmailExist = async (email) => {
  try {
    const record = await referrers.findOne({
      where: { email },
    });
    return !!record;
  } catch (error) {
    console.error("Referrer not found.", error);
    return false;
  }
};

// Adds a new Referrer
export const addReferrer = async (req, res) => {
  const {
    name,
    gender,
    email,
    phone,
    password,
    confirmPassword,
    usdtTronAddress,
  } = req.body;

  var isInputError = false;
  var inputsInfo = {
    inputs: {
      name: {
        type: "name",
        isError: false,
        errMsg: "",
      },
      gender: {
        type: "gender",
        isError: false,
        errMsg: "",
      },
      email: {
        type: "email",
        isError: false,
        errMsg: "",
      },
      phone: { type: "phone", isError: false, errMsg: "" },
      password: { type: "password", isError: false, errMsg: "" },
      confirmPassword: { type: "confirmPassword", isError: false, errMsg: "" },
    },
    messageType: "INPUT_ERROR",
  };

  // Check if the name input is empty
  if (name.trim() === "") {
    inputsInfo.inputs.name.errMsg = "Full name required.";
    inputsInfo.inputs.name.isError = true;

    isInputError = true;
  }

  // Check if the gender input is empty
  if (gender.trim() === "") {
    inputsInfo.inputs.gender.errMsg = "Gender is required.";
    inputsInfo.inputs.gender.isError = true;

    isInputError = true;
  }

  // Check if the phone input is empty
  if (phone.trim() === "") {
    inputsInfo.inputs.phone.errMsg = "Phone number required.";
    inputsInfo.inputs.phone.isError = true;

    isInputError = true;
  }

  // Check if the email is an invalid email address
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) == false) {
    inputsInfo.inputs.email.errMsg = "Invalid email address.";
    inputsInfo.inputs.email.isError = true;

    isInputError = true;
  }

  if (email.trim() === "") {
    inputsInfo.inputs.email.errMsg = "Email address is required.";
    inputsInfo.inputs.email.isError = true;

    isInputError = true;
  }

  if (await isEmailExist(email)) {
    inputsInfo.inputs.email.errMsg = "Email associated with existing account.";
    inputsInfo.inputs.email.isError = true;
    isInputError = true;
  }

  if (password.trim() === "") {
    inputsInfo.inputs.password.errMsg = "Password required.";
    inputsInfo.inputs.password.isError = true;

    isInputError = true;
  }

  if (confirmPassword.trim() === "" || password !== confirmPassword) {
    inputsInfo.inputs.confirmPassword.errMsg = "Passwords should match.";
    inputsInfo.inputs.confirmPassword.isError = true;

    isInputError = true;
  }

  if (isInputError) {
    // Send the inputsInfo object as a response
    res.status(400).json(inputsInfo);
    return;
  }

  if (isInputError == false) {
    const registration_date = new Date().toISOString().split("T")[0];

    const registration_time = new Date().toLocaleTimeString({
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const date_registered = `${registration_date} ${registration_time}`;
    const account_id = await generateId(12);

    try {
      const referrer = await referrers.create({
        name: name,
        gender: gender,
        email: email,
        phone: phone,
        password: password,
        account_id: account_id,
        date_registered: date_registered,
        usdt_tron_address: usdtTronAddress,
      });

      res.status(201).json({
        message: "Referrer added successfully",
        accountId: referrer.account_id,
        messageType: "SERVER_SUCCESS",
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Internal Server Error", messageType: "SERVER_ERROR" });
    }
  }
};

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized successfully!");
  })
  .catch((error) => {
    console.error("An error occurred during synchronization.", error);
  });
