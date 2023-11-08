export default async function checkIsExists(value, fieldName, model) {
  try {
    const record = await model
      .findOne({
        where: {
          [fieldName]: value,
        },
      })
      .then((exists) => {
        if (exists) {
          return true;
        } else {
          return false;
        }
      });

    return record;
  } catch (error) {
    console.error("Error checking if record exists:", error);
  }
}
