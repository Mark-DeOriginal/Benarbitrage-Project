import React, { useEffect, useState } from "react";
import { CopyIcon, SuccessIcon } from "./icons";
import { TUSDIcon, USDCIcon, USDTIcon } from "./payMtdIcons";
import confirmCryptoPmt from "../utilities/confirmCryptoPmt";
import getCookie from "../utilities/getCookie";

import { scroller as scroll } from "react-scroll";
import { useDispatch } from "react-redux";
import { setAccountBalance } from "../redux-states/uiSlice";
import insertDelimiters from "../utilities/insertDelimiters";
const PaymentSystem = () => {
  const handleTxIdChange = (e) => {
    setTransactionId(e.target.value);
    setIsTxIdError(false);
    setTxConfirmStatus("uninitialized");
  };

  const [transactionId, setTransactionId] = useState("");
  const [isTxIdError, setIsTxIdError] = useState(false);
  const [txIdErrorMessage, setTxIdErrorMessage] = useState("");

  const [txConfirmStatus, setTxConfirmStatus] = useState("uninitialized");

  const [disableControls, setDisableControls] = useState(false);

  useEffect(() => {
    if (
      txConfirmStatus === "uninitialized" ||
      txConfirmStatus === "try-again"
    ) {
      setDisableControls(false);
    } else {
      setDisableControls(true);
    }
  }, [txConfirmStatus]);

  const dispatch = useDispatch();

  const processPayment = (event) => {
    event.preventDefault();

    if (transactionId.trim() === "") {
      setIsTxIdError(true);
      setTxIdErrorMessage("Please enter the TxID to confirm");
    } else if (transactionId.length < 50) {
      setIsTxIdError(true);
      setTxIdErrorMessage("Input does not match a valid TxID");
    } else {
      setTxConfirmStatus("confirming");

      confirmCryptoPmt(
        transactionId,
        paymentMethod[pMtdIndex].supportedNetwork,
        paymentMethod[pMtdIndex].paymentAddress
      )
        .then((transactionDetails) => {
          const purchaseData = {
            assetName: "Deposit",
            assetAmount: transactionDetails.contractData.amount,
            purchaseDate: new Date(),
            paymentWalletAddress: paymentMethod[pMtdIndex].paymentAddress,
            cryptoName: paymentMethod[pMtdIndex].name,
            transactionID: transactionId,
            userID: getCookie("accountId", ""),
          };
          // Make a POST request with the purchaseDetails to our /store-asset api endpoint
          fetch("https://p0xq2gpd-5174.uks1.devtunnels.ms/user/store-asset", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(purchaseData),
          })
            .then((response) => {
              return response.json();
            })
            .then((response) => {
              if (response.message === "Already Confirmed") {
                setTxConfirmStatus("already-confirmed");

                setTimeout(() => {
                  scroll.scrollTo("balance", {
                    duration: 800,
                    smooth: "easeInOutQuart",
                    offset: -100,
                  });
                }, 1000);

                console.log(response);
              } else if (response.message === "SERVER_SUCCESS") {
                setTxConfirmStatus("confirmed");

                dispatch(
                  setAccountBalance({
                    balance: insertDelimiters(response.walletBalance) + ".00",
                    interest:
                      insertDelimiters(response.accumulatedInterest) + ".00",
                  })
                );

                setTimeout(() => {
                  scroll.scrollTo("balance", {
                    duration: 800,
                    smooth: "easeInOutQuart",
                    offset: -100,
                  });
                }, 1000);

                // If the payment was confirmed successfully...
                console.log("Asset saved successfully.");
                console.log(response);
              } else {
                console.log(response);
                throw new Error("HTTP error! Status: " + response.status);
              }
            })
            .catch((error) => {
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setTxConfirmStatus("error");
                  resolve();
                }, 2000);
              }).then(() => {
                setTimeout(() => {
                  setTxConfirmStatus("try-again");
                }, 2000);
              });
              console.log("Couldn't credit wallet.");
              console.log(error);
            });
        })
        .catch(() => {
          new Promise((resolve, reject) => {
            setTimeout(() => {
              setTxConfirmStatus("error");
              resolve();
            }, 2000);
          }).then(() => {
            setTimeout(() => {
              setTxConfirmStatus("try-again");
            }, 2000);
          });
        });
    }
  };

  const [isPayAddrCopied, setIsPayAddrCopied] = useState(false);

  const copyPaymentAddress = () => {
    const paymentAddress = document.querySelector(".crypto-address");
    navigator.clipboard.writeText(paymentAddress.value).then(() => {
      setIsPayAddrCopied(true);
    });

    setTimeout(() => {
      setIsPayAddrCopied(false);
    }, 3000);
  };

  const [paymentMethod] = useState([
    {
      name: "TetherUS - USDT",
      logo: <USDTIcon />,
      popularName: "USDT",
      paymentAddress: "TAiTqyYFav1y1tJLWKYnVqFwgapEVtBYJw",
      supportedNetwork: "TRON (TRC20)",
      recommended: true,
    },
    {
      name: "USD Coin - USDC",
      logo: <USDCIcon />,
      popularName: "USD Coin",
      paymentAddress: "TAiTqyYFav1y1tJLWKYnVqFwgapEVtBYJw",
      supportedNetwork: "TRON (TRC20)",
    },
    {
      name: "TrueUSD - TUSD",
      logo: <TUSDIcon />,
      popularName: "TrueUSD",
      paymentAddress: "0xb329Abdd1B2639bbeC601e379DFcC3f68FEfbF31",
      supportedNetwork: "Ethereum (ERC20)",
    },
  ]);

  const [pMtdIndex, setPMtdIndex] = useState(0);

  const changePMtd = () => {
    if (pMtdIndex >= paymentMethod.length - 1) {
      setPMtdIndex(0);
    } else {
      setPMtdIndex((prev) => prev + 1);
    }
  };
  return (
    <>
      <div className="payment-wrapper max-w-[400px] mx-auto">
        <div className="payment-container my-8 bg-white dark:bg-benBlue-lightC border border-navBarBorderLight dark:border-benBlue-lightB drop-shadow-sm rounded-2xl">
          <div className="header flex justify-between p-4">
            <div className="payment-method flex gap-3 items-center">
              <div className="payment-logo-wrapper w-[52px] h-[52px] flex justify-center items-center p-1 rounded-xl border-2 border-navBarBorderLight dark:border-benBlue-lightC2">
                {paymentMethod[pMtdIndex].logo}
              </div>

              <div>
                <p>Deposit using</p>
                <p className="mt-0 text-base tablet:text-lg font-bold">
                  {paymentMethod[pMtdIndex].name}
                </p>
              </div>
            </div>
            <div className="change-payment-type text-errorColor">
              <button
                onClick={changePMtd}
                disabled={disableControls ? true : false}
                className="cursor-pointer text-xs font-medium tablet:text-sm active:scale-[0.95]"
              >
                Change &gt;
              </button>
            </div>
          </div>
          <div className="payment-body px-4 pb-4 space-y-2">
            <div className="payment-network">
              <label className="text-sm">Supported Network</label>
              <input
                type="text"
                value={paymentMethod[pMtdIndex].supportedNetwork}
                className="payment-network font-medium w-full drop-shadow-sm rounded-lg py-2 px-3 mt-1 bg-transparent border border-navBarBorderLight dark:border-benBlue-lightC2"
                readOnly={true}
              />
            </div>
            <div className="payment-address">
              <label className="text-sm">
                {paymentMethod[pMtdIndex].popularName} Deposit Address
              </label>
              <div className="address-wrapper flex drop-shadow-sm rounded-lg border border-navBarBorderLight dark:border-benBlue-lightC2 mt-1">
                <div className="address relative flex-grow overflow-hidden font-medium py-2 pl-3">
                  <input
                    type="text"
                    value={paymentMethod[pMtdIndex].paymentAddress}
                    className="crypto-address w-full bg-transparent"
                    readOnly={true}
                  />
                  <div className="feather absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-white dark:from-benBlue-lightC to-transparent"></div>
                </div>
                <button
                  onClick={copyPaymentAddress}
                  className="addr-copy-btn flex-none flex py-2 px-3 gap-2 items-center"
                >
                  <CopyIcon
                    className={`fill-benBlue-lightB dark:fill-benBlue-200 w-[18px]`}
                  />
                  <span>{isPayAddrCopied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>
            <div className="tx-id">
              <form onSubmit={processPayment}>
                <label htmlFor="txId" className="text-sm">
                  Transaction ID (TxID)
                </label>
                <input
                  type="text"
                  id="txId"
                  value={transactionId}
                  onChange={handleTxIdChange}
                  readOnly={disableControls ? true : false}
                  placeholder="Enter transaction ID"
                  className={`crypto-address font-medium w-full drop-shadow-sm rounded-lg py-2 px-3 mt-1 bg-transparent border ${
                    isTxIdError
                      ? "border-errorColor dark:border-errorColor"
                      : "border-navBarBorderLight dark:border-benBlue-lightC2"
                  }`}
                />
                {
                  // If there's an error, render the <p> element with the error message
                  isTxIdError && (
                    <p className="message text-left mt-[6px] text-sm text-errorColor">
                      {txIdErrorMessage}
                    </p>
                  )
                }
                <button
                  type="submit"
                  disabled={disableControls ? true : false}
                  className={`${
                    txConfirmStatus === "error" ||
                    txConfirmStatus === "try-again"
                      ? "bg-[#fdc4a2] text-benBlue-lightC2"
                      : txConfirmStatus === "confirmed" ||
                        txConfirmStatus === "already-confirmed"
                      ? "bg-[#bce1b5] text-[#547455]"
                      : "bg-benBlue-100 dark:bg-benBlue-lightE text-benBlue-lightC2 dark:text-benBlue-100"
                  } flex justify-center items-center gap-2 transition-colors duration-300 active:scale-[0.95] rounded-xl w-full py-2 px-4 text-center font-medium text-base tablet:text-lg mt-4`}
                >
                  {txConfirmStatus === "confirming"
                    ? "Confirming"
                    : txConfirmStatus === "confirmed"
                    ? "Deposit Confirmed"
                    : txConfirmStatus === "already-confirmed"
                    ? "Already Confirmed"
                    : txConfirmStatus === "error"
                    ? "Confirmation error"
                    : txConfirmStatus === "try-again"
                    ? "Try again"
                    : "Confirm Deposit"}
                  {txConfirmStatus === "confirmed" ||
                  txConfirmStatus === "already-confirmed" ? (
                    <SuccessIcon className={`fill-[#547455]`} />
                  ) : (
                    ""
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSystem;
