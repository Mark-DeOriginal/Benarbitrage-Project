import React, { useEffect, useState } from "react";
import getReferrerDetails from "../../utilities/getReferrerDetails";
import insertDelimiters from "../../utilities/insertDelimiters";
import copyToClipboard from "../../utilities/copyToClipboard";

export const CopyTxIdBtn = ({ txId }) => {
  const [isTxIdCopied, setIsTxIdCopied] = useState(false);

  const copyTxId = (value) => {
    setIsTxIdCopied(true);
    copyToClipboard(value);

    setTimeout(() => {
      setIsTxIdCopied(false);
    }, 2000);
  };

  return (
    <button
      onClick={() => copyTxId(txId)}
      className="referrer-btn flex-none bg-benBlue-light dark:bg-benBlue-lightC2 py-1 px-2 mobile_lg:py-2 mobile_lg:px-4 rounded-full active:scale-[0.95]"
    >
      {isTxIdCopied ? "Copied" : "Copy TxId"}
    </button>
  );
};

export default function PayoutsTable() {
  const payouts =
    getReferrerDetails("payouts", "").length > 0
      ? { isAvailable: true }
      : { isAvailable: false };

  const parseDate = (dateString) => {
    // Original date string
    const originalDateString = dateString;
    if (originalDateString == null || originalDateString.trim() == "") {
      return "--";
    }

    // Parse the original date string into a Date object
    const originalDate = new Date(originalDateString);

    // Extract day, month, and year components from the Date object
    const day = originalDate.getDate().toString().padStart(2, "0"); // Ensure two digits with leading zero if necessary
    const month = (originalDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = originalDate.getFullYear();

    // Create the formatted date string in the format dd/mm/yyyy
    return `${day}/${month}/${year}`;
  };

  return payouts.isAvailable ? (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Amount</th>
          <th>TxId</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {getReferrerDetails("payouts", "").map((payout, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>${insertDelimiters(payout.payout_amount)}</td>
            <td>
              <div className="flex items-center justify-between">
                <div className="referrer-link relative hidden mobile:block">
                  <input
                    type="text"
                    value={payout.tx_id || "--"}
                    readOnly={true}
                    className="bg-transparent w-full"
                  />
                  <div className="feather absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-[#ededf2] dark:from-[#3d3c62] to-transparent"></div>
                </div>{" "}
                {payout.tx_id !== null && payout.tx_id !== "" && (
                  <CopyTxIdBtn txId={payout.tx_id} />
                )}
              </div>
            </td>
            <td>{parseDate(payout.payout_date)}</td>
            <td>{payout.payout_status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p className="no-payouts-info text-sm tablet:text-base text-center">
      There are no payout activities yet. <br />
      When payouts come in, you will see them here.
    </p>
  );
}
