const insertDelimiters = (figure) => {
  const parts = figure.toString().split(".");
  const integer = parts[0].replace(/\B(?=(.{3})+(?!.))/g, ",");
  const decimal = parts[1] ? "." + parts[1] : "";
  const formatted = `${integer}${decimal}`;

  return formatted;
};

export default insertDelimiters;
