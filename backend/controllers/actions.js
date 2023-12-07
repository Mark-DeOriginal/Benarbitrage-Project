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

// Our User Model
const { users } = initModels();

// Checks if the email already exists
const isEmailExist = async (email) => {
  try {
    const record = await users.findOne({
      where: { email },
    });
    return !!record;
  } catch (error) {
    console.error("Error finding user.", error);
    return false;
  }
};

// Checks if the password matches that in the database
const isPasswordCorrect = async (email, password) => {
  try {
    const record = await users.findOne({
      where: { email },
    });
    const storedPassword = record.password;

    if (password === storedPassword) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error finding user.", error);
    return false;
  }
};

// Creates a new User
export const createUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  var isInputError = false;
  var inputsInfo = {
    inputs: {
      name: {
        type: "name",
        isError: false,
        errMsg: "",
      },
      email: {
        type: "email",
        isError: false,
        errMsg: "",
      },
      password: {
        type: "password",
        isError: false,
        errMsg: "",
      },
      confirmPassword: {
        type: "confirmPassword",
        isError: false,
        errMsg: "",
      },
    },
    messageType: "INPUT_ERROR",
  };

  // Check if the name input is empty
  if (name.trim() === "") {
    inputsInfo.inputs.name.errMsg = "Full name required.";
    inputsInfo.inputs.name.isError = true;

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
    const reg_completed = false;
    const account_id = await generateId(12);
    const account_validated = false;
    const account_type = "Not yet chosen.";
    const onboarding_stage = "2";

    try {
      const user = await users.create(
        {
          name,
          email,
          password,
          account_id,
          account_validated,
          account_type,
          date_registered,
          onboarding_stage,
          reg_completed,
        },
        {
          fields: [
            "name",
            "email",
            "password",
            "account_id",
            "account_validated",
            "account_type",
            "date_registered",
            "onboarding_stage",
            "reg_completed",
          ],
        }
      );
      res.status(201).json({
        message: "User created successfully",
        accountId: user.account_id,
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

// Set's User's account type
export const setUserAccType = async (req, res) => {
  const { userEmail, account_type } = req.body;

  const nextOnboardingStage = 3;

  users
    .findOne({
      where: {
        email: userEmail,
      },
    })
    .then((user) => {
      if (user) {
        user
          .update({
            account_type: account_type,
            onboarding_stage: nextOnboardingStage,
            account_validated: true,
            accumulated_interest: 0,
          })
          .then((updatedUser) => {
            console.log("Account type updated successfully.", updatedUser);
            res.status(201).json({
              message: "Account validated successfully.",
              messageType: "SERVER_SUCCESS",
            });
          })
          .catch((error) => {
            console.error("Error updating account type.", error);
            res.status(500).json({
              error: "Internal Server Error",
              messageType: "SERVER_ERROR",
            });
          });
      } else {
        console.error("User not found");
        res.status(500).json({
          error: "User not found",
          messageType: "USER_NOT_FOUND",
        });
      }
    })
    .catch((error) => {
      console.error("Error finding user.", error);
      res.status(500).json({
        error: "User not found",
        messageType: "USER_NOT_FOUND",
      });
    });
};

// Authenticates User
export const authenticateUser = async (req, res) => {
  const { email, password } = req.body;

  var isInputError = false;
  var inputsInfo = {
    inputs: {
      email: {
        type: "email",
        isError: false,
        errMsg: "",
      },
      password: {
        type: "password",
        isError: false,
        errMsg: "",
      },
    },
    messageType: "INPUT_ERROR",
  };

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

  if (password.trim() === "") {
    inputsInfo.inputs.password.errMsg = "Password required.";
    inputsInfo.inputs.password.isError = true;

    isInputError = true;
  }

  if (isInputError) {
    // Send the inputsInfo object as a response
    res.status(400).json(inputsInfo);
    return;
  } else if ((await isEmailExist(email)) == false) {
    inputsInfo.inputs.email.errMsg = "Email not associated with any account.";
    inputsInfo.inputs.email.isError = true;
    isInputError = true;

    res.status(404).json(inputsInfo);
    return;
  } else if ((await isPasswordCorrect(email, password)) == false) {
    inputsInfo.inputs.password.errMsg = "Password entered is incorrect.";
    inputsInfo.inputs.password.isError = true;
    isInputError = true;

    // Send the inputsInfo object as a response
    res.status(400).json(inputsInfo);
    return;
  } else {
    const login_day = new Date().toISOString().split("T")[0];

    const login_time = new Date().toLocaleTimeString({
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const dateOfLogin = `${login_day} ${login_time}`;

    const user = await users.findOne({
      where: { email },
    });

    user.update({
      last_login_date: dateOfLogin,
    });

    const userDetails = {
      name: user.name,
      email: user.email,
      accountId: user.account_id,
      accountType: user.account_type,
      onboardingStage: user.onboarding_stage,
    };

    res.status(200).json({
      message: "Authentication successful",
      userDetails: userDetails,
      messageType: "SERVER_SUCCESS",
    });
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
