import React, { useEffect, useState } from "react";
import { CopyIcon } from "../icons";
import insertDelimiters from "../../utilities/insertDelimiters";
import getReferrerDetails from "../../utilities/getReferrerDetails";
import LoadingGridCube from "../LoadingGridCube";

export const Payout = ({ payouts }) => {
  const [isWalletAddrCopied, setIsWalletAddrCopied] = useState(false);

  const copyWalletAddress = (value) => {
    navigator.clipboard.writeText(value).then(() => {
      setIsWalletAddrCopied(true);
    });

    setTimeout(() => {
      setIsWalletAddrCopied(false);
    }, 3000);
  };

  const [payoutsToMake, setPayoutsToMake] = useState(payouts);

  const [currentPayout, setCurrentPayout] = useState(0); // Selects the first payout to make on initialization

  const [payoutTxId, setPayoutTxId] = useState(
    payoutsToMake[currentPayout].tx_id || ""
  );

  const handleTxIdChange = (value) => {
    let payouts = [...payoutsToMake];
    payouts[currentPayout].tx_id = value;

    setPayoutsToMake(payouts);
  };

  const goToNextPayout = () => {
    if (currentPayout < payoutsToMake.length - 1) {
      setCurrentPayout((prev) => prev + 1);
    }
  };

  const goToPrevPayout = () => {
    if (currentPayout > 0) {
      setCurrentPayout((prev) => prev - 1);
    }
  };
  const originalAmount = payoutsToMake[currentPayout].original_amount || 0;
  const payoutAmount = payoutsToMake[currentPayout].payout_amount || 0;
  const [newPayoutAmount, setNewPayoutAmount] = useState(payoutAmount);

  const [payoutPercentage, setPayoutPercentage] = useState(60);

  useEffect(() => {
    setNewPayoutAmount(() => payoutsToMake[currentPayout].payout_amount || 0);
    setPayoutPercentage(() => 60);
  }, [currentPayout]);

  const increasePayoutPercentage = () => {
    if (payoutPercentage < 100) {
      setPayoutPercentage((prevPercentage) => prevPercentage + 5);
      setNewPayoutAmount(() => newPayoutAmount + (5 * originalAmount) / 100);
    }
  };

  const reducePayoutPercentage = () => {
    if (payoutPercentage > 60) {
      setPayoutPercentage((prevPercentage) => prevPercentage - 5);
      setNewPayoutAmount(() => newPayoutAmount - (5 * originalAmount) / 100);
    }
  };

  const confirmPayout = async () => {
    if (payoutsToMake[currentPayout].payout_status !== "paid") {
      if (
        payoutsToMake[currentPayout].tx_id == null ||
        payoutsToMake[currentPayout].tx_id.trim() === ""
      ) {
        const txIdField = document.querySelector(`input[name="txId"]`);
        setTimeout(() => {
          txIdField.focus();
        }, 500);
      } else {
        let payoutToConfirm = [...payoutsToMake];
        payoutToConfirm[currentPayout].payout_status = "confirming";
        setPayoutsToMake(payoutToConfirm);

        const payoutDetails = {
          payoutAmount: newPayoutAmount,
          payoutMethod: "USDT - Tron (TRC20)",
          payoutPercentage: payoutPercentage,
          payoutId: payoutsToMake[currentPayout].id,
          txId: payoutsToMake[currentPayout].tx_id,
        };

        return fetch(
          "https://benarbitrage-server.up.railway.app/referrer/confirm-payout",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payoutDetails),
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((result) => {
            setTimeout(() => {
              let payouts = [...payoutsToMake];
              payouts[currentPayout].payout_status = "paid";
              payouts[currentPayout].payout_amount = newPayoutAmount;
              payouts[currentPayout].payout_percentage = payoutPercentage;

              setPayoutsToMake(payouts);
            }, 1000);

            console.log(result);
          })
          .catch((error) => {
            let payoutToConfirm = [...payoutsToMake];
            payoutToConfirm[currentPayout].payout_status = "error";

            throw error;
          });
      }
    }
  };
  return (
    <>
      <div className="payout space-y-2 bg-[#ededf2] dark:bg-benBlue-lightC rounded-2xl px-3 py-4">
        <div className="row flex flex-col gap-2">
          <div className="column">
            <h3>Payee name</h3>
            <p className="text-lg mobile_lg:text-xl font-bold">
              {payoutsToMake[currentPayout].payee_name}
            </p>
          </div>
          <div className="column">
            <h3>Payout date</h3>
            <p>{payoutsToMake[currentPayout].payout_date || "Not available"}</p>
          </div>
        </div>
        <div className="row flex flex-col gap-4">
          <div className="column">
            <h3>Payout amount</h3>
            <div className="payout-amount-wrapper flex items-center gap-4">
              <p className="text-3xl mobile_lg:text-4xl font-bold">
                ${insertDelimiters(newPayoutAmount)}
              </p>
              <div className="payout-percentage flex items-center gap-1">
                <button
                  onClick={reducePayoutPercentage}
                  className="bg-benBlue-light dark:bg-benBlue-lightC2 rounded-full w-6 h-6 flex justify-center active:scale-[0.95]"
                >
                  &lt;
                </button>
                <span className="text-xl">{payoutPercentage}%</span>
                <button
                  onClick={increasePayoutPercentage}
                  className="bg-benBlue-light dark:bg-benBlue-lightC2 rounded-full w-6 h-6 flex justify-center active:scale-[0.95]"
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
          <div className="column">
            <h3>Wallet Address (USDT - Tron)</h3>
            <div className="wallet-address-wrapper flex rounded-2xl border border-navBarBorderLight dark:border-benBlue-lightC2 mt-1">
              <div className="relative flex-grow overflow-hidden font-medium py-3 pl-3">
                <input
                  type="text"
                  value={
                    payoutsToMake[currentPayout].payout_wallet_address ||
                    "Not available"
                  }
                  className="crypto-address w-full bg-transparent"
                  readOnly={true}
                />
                <div className="feather absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-[#ededf2] dark:from-benBlue-lightC to-transparent"></div>
              </div>
              <button
                onClick={() =>
                  copyWalletAddress(
                    payoutsToMake[currentPayout].payout_wallet_address ||
                      "Not available"
                  )
                }
                className="addr-copy-btn flex-none flex py-2 px-3 gap-2 items-center"
              >
                <CopyIcon
                  className={`fill-benBlue-lightB dark:fill-benBlue-200 w-[18px]`}
                />
                <span>{isWalletAddrCopied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>
          <div className="column">
            <h3>Payout Transaction Id</h3>
            <div className="referrer-link-wrapper flex items-center p-1 pl-4 rounded-2xl border border-benBlue-light dark:border-benBlue-lightC2 mt-1">
              <div className="relative flex-grow font-medium">
                <input
                  type="text"
                  name="txId"
                  value={payoutsToMake[currentPayout].tx_id || ""}
                  onChange={(e) => handleTxIdChange(e.target.value)}
                  readOnly={
                    payoutsToMake[currentPayout].payout_status === "paid"
                      ? true
                      : false
                  }
                  placeholder="Enter TxId"
                  className="referrer-link bg-transparent w-full"
                />
                <div className="feather absolute top-0 right-0 h-full w-6 bg-gradient-to-l from-[#ededf2] dark:from-benBlue-lightC to-transparent"></div>
              </div>
              <button
                onClick={() => confirmPayout()}
                className={`referrer-btn flex-none ${
                  payoutsToMake[currentPayout].payout_status === "unpaid" ||
                  payoutsToMake[currentPayout].payout_status === "confirming"
                    ? "bg-benBlue-light dark:bg-benBlue-lightC2"
                    : payoutsToMake[currentPayout].payout_status === "paid"
                    ? "bg-[#bce1b5] text-[#547455]"
                    : "bg-[#fdc4a2] text-benBlue-lightC2"
                } py-2 px-4 rounded-xl active:scale-[0.95]`}
              >
                {payoutsToMake[currentPayout].payout_status === "unpaid"
                  ? "Confirm payout"
                  : payoutsToMake[currentPayout].payout_status === "paid"
                  ? "Paid out"
                  : payoutsToMake[currentPayout].payout_status === "confirming"
                  ? "Confirming"
                  : "Confirmation error"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="payout-navigator flex items-center gap-1 mt-4 w-fit mx-auto">
        <button
          onClick={goToPrevPayout}
          className="bg-benBlue-light dark:bg-benBlue-lightC2 rounded-full w-9 h-9 flex items-center justify-center active:scale-[0.95] text-lg mobile_lg:text-xl"
        >
          &lt;
        </button>
        <span className="text-xl">{`${currentPayout + 1}/${
          payoutsToMake.length
        }`}</span>
        <button
          onClick={goToNextPayout}
          className="bg-benBlue-light dark:bg-benBlue-lightC2 rounded-full w-9 h-9 flex items-center justify-center active:scale-[0.95] text-lg mobile_lg:text-xl"
        >
          &gt;
        </button>
      </div>
    </>
  );
};

export default function MakePayout() {
  const [payouts, setPayouts] = useState([]);
  const [canShow, setCanShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setPayouts(getReferrerDetails("payoutsToMake", []));
      setCanShow(true);
    }, 10000);
  }, []);

  return (
    <div className="make-payout max-w-[500px] laptop:mb-12 mx-auto space-y-4 bg-benWhite dark:bg-[#4b4a73] rounded-xl p-4 tablet:p-6">
      <h2 className="text-xl mobile:text-2xl font-bold">Make payout</h2>
      <div className="payouts-wrapper">
        {canShow ? (
          payouts.length > 0 ? (
            <Payout payouts={payouts} />
          ) : (
            <p className="bg-[#ededf2] dark:bg-benBlue-lightC rounded-2xl px-3 py-4">
              There are no payouts to make. <br />
              Please check back later.
            </p>
          )
        ) : (
          <LoadingGridCube className={`!w-10 !h-10 !mx-0`} />
        )}
      </div>
    </div>
  );
}
