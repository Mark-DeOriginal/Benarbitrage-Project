import initModels from "../models/init-models.js";
import generateId from "../utilities/generateId.js";
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

// Adds a new Referrer
export const addReferrer = async (req, res) => {
  const { name, email, phone, password, confirmPassword, usdtTronWallet } =
    req.body;

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
        email: email,
        phone: phone,
        password: password,
        account_id: account_id,
        date_registered: date_registered,
        usdt_tron_address: usdtTronWallet,
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

      res.status(201).json({
        message: "Referrer added successfully",
        referrerDetails: referrerDetails,
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
