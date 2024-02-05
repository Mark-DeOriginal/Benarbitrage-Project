import initModels from "../models/init-models.js";
import getPendingPayouts from "../utilities/referrers/getPendingPayouts.js";
import getTotalPayouts from "../utilities/referrers/getTotalPayouts.js";

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

// Checks if the password matches that in the database
const isPasswordCorrect = async (email, password) => {
  try {
    const record = await referrers.findOne({
      where: { email },
    });
    const storedPassword = record.password;

    if (password === storedPassword) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Referrer not found.", error);
    return false;
  }
};

// Authenticate Referrer
export const authenticateReferrer = async (req, res) => {
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

    const referrer = await referrers.findOne({
      where: { email },
    });

    referrer.update({
      last_login_date: dateOfLogin,
    });

    const totalPayouts = await getTotalPayouts(referrer);
    const pendingPayouts = await getPendingPayouts(referrer);
    const payouts = await referrer.getPayouts();

    const referrerDetails = {
      name: referrer.name,
      email: referrer.email,
      phone: referrer.phone,
      usdtTronAddress: referrer.usdt_tron_address,
      password: referrer.password,
      accountId: referrer.account_id,
      totalPayouts: totalPayouts,
      pendingPayouts: pendingPayouts,
      totalRefers: referrer.total_refers,
      successfulRefers: referrer.total_successful_refers,
      payouts: payouts,
      isAdmin: referrer.is_admin,
      isSignedInAsReferrer: true,
    };

    res.status(200).json({
      message: "Authentication successful",
      referrerDetails: referrerDetails,
      messageType: "SERVER_SUCCESS",
    });
  }
};
