export const createNewUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  var isInputError = false;
  function processInputError(name, email, password, confirmPassword) {
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
    }
  }

  processInputError(name, email, password, confirmPassword);

  if (isInputError == false) {
    const registration_date = new Date().toISOString().split("T")[0];

    const registration_time = new Date().toLocaleTimeString({
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const date_registered = `${registration_date} ${registration_time}`;
    const reg_completed = false;
    const account_validated = false;
    const account_type = "Not yet chosen.";
    const onboarding_stage = "2";

    try {
      const user = await users.create(
        {
          name,
          email,
          password,
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
