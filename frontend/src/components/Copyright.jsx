import React from "react";

export default function CopyRight() {
  const date = new Date();
  const currentYear = date.getFullYear();
  return <p>Copyright &copy; 2023 - {currentYear} Benarbitrage</p>;
}
