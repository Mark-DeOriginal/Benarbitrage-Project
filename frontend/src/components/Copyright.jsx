import React from "react";

export default function CopyRight() {
  const launchYear = 2024;
  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <p>
      Copyright &copy; {launchYear}{" "}
      {launchYear !== currentYear ? `- ${currentYear}` : ""} Benarbitrage
    </p>
  );
}
