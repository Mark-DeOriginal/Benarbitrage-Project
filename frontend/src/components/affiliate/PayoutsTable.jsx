import React from "react";

export default function PayoutsTable() {
  const isPayoutAvailable = true;
  return isPayoutAvailable ? (
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
        <tr>
          <td>1</td>
          <td>$5,000</td>
          <td>
            <div className="flex items-center justify-between">
              <div className="referrer-link relative hidden mobile:block">
                <input
                  type="text"
                  value={"WsdSsgwfhr2SWsdfasddfsa"}
                  readOnly={true}
                  className="bg-transparent w-full"
                />
                <div className="feather absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-[#ededf2] dark:from-[#3d3c62] to-transparent"></div>
              </div>
              <button className="referrer-btn flex-none bg-benBlue-light dark:bg-benBlue-lightC2 py-1 px-2 mobile_lg:py-2 mobile_lg:px-4 rounded-full active:scale-[0.95]">
                Copy TxId
              </button>
            </div>
          </td>
          <td>21/2/2024</td>
          <td>Paid</td>
        </tr>
      </tbody>
    </table>
  ) : (
    <p className="no-payouts-info text-sm tablet:text-base text-center">
      There are no payout activities yet. <br />
      When payouts come in, you will see them here.
    </p>
  );
}
