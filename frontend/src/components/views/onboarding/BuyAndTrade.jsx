import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../LoadingSpinner";
import { CopyIcon, SuccessIcon } from "../../icons";
import {
  BTCIcon,
  TUSDIcon,
  ETHIcon,
  USDCIcon,
  USDTIcon,
} from "../../payMtdIcons";
import CopyRight from "../../Copyright";
import Logo from "../../BenarbitrageLogo";
import DarkModeToggle from "../../DarkModeToggle";
import LanguageSelector from "../../LanguageSelector";
import confirmCryptoPmt from "../../../utilities/confirmCryptoPmt";
import setCookie from "../../../utilities/setCookie";

import ReactGA from "react-ga";
import PaymentGuide from "../../PaymentGuide";
ReactGA.initialize("G-S8XRE42QPV");

export default function BuyAndTrade() {
  const [showloader, setShowLoader] = useState(true);
  const [showBuyAndTrade, setShowBuyAndTrade] = useState(false);

  const delay = 2000;

  useEffect(() => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        setShowLoader(false);
        resolve();
      }, delay);
    }).then(() => {
      setTimeout(() => {
        setShowBuyAndTrade(true);
      }, 500);
    });
  }, []);

  const handleTxIdChange = (e) => {
    setTransactionId(e.target.value);
    setIsTxIdError(false);
    setTxConfirmStatus("uninitialized");
  };

  const parsedUrlParams = () => {
    const parseString = (value) => {
      const string = value;
      return string
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
    };

    return {
      assetName: parseString(useParams().assetName),
      assetAmount: useParams().assetAmount,
      userName: parseString(useParams().userName),
      userID: useParams().accID,
    };
  };
  const { assetName, assetAmount, userName, userID } = parsedUrlParams();

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

      ReactGA.event({
        category: "Asset Purchase",
        action: "Clicked the Confirm Purchase button",
      });

      confirmCryptoPmt(
        transactionId,
        paymentMethod[pMtdIndex].supportedNetwork,
        paymentMethod[pMtdIndex].paymentAddress
      )
        .then(() => {
          const purchaseData = {
            assetName: assetName,
            assetAmount: parseFloat(assetAmount.split(",").join("")),
            purchaseDate: new Date(),
            paymentWalletAddress: paymentMethod[pMtdIndex].paymentAddress,
            cryptoName: paymentMethod[pMtdIndex].name,
            transactionID: transactionId,
            userID: userID,
          };
          // Make a POST request with the purchaseDetails to our /store-asset api endpoint
          fetch("https://benarbitrage-server.up.railway.app/user/store-asset", {
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
                setCookie("onboardingStage", "COMPLETED");
                localStorage.setItem("onboardingStage", "COMPLETED");
                console.log(response);
              } else if (response.message === "SERVER_SUCCESS") {
                setTxConfirmStatus("confirmed");

                // If the payment was confirmed successfully...
                setCookie("onboardingStage", "COMPLETED");
                localStorage.setItem("onboardingStage", "COMPLETED");
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
              console.log("Couldn't save asset.");
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
      name: "USDT",
      logo: <USDTIcon />,
      popularName: "USDT",
      paymentAddress: "TAiTqyYFav1y1tJLWKYnVqFwgapEVtBYJw",
      supportedNetwork: "TRON (TRC20)",
      recommended: true,
    },
    {
      name: "USDC - USD Coin",
      logo: <USDCIcon />,
      popularName: "USD Coin",
      paymentAddress: "TAiTqyYFav1y1tJLWKYnVqFwgapEVtBYJw",
      supportedNetwork: "TRON (TRC20)",
    },
    {
      name: "TUSD - TrueUSD",
      logo: <TUSDIcon />,
      popularName: "TrueUSD",
      paymentAddress: "TAiTqyYFav1y1tJLWKYnVqFwgapEVtBYJw",
      supportedNetwork: "TRON (TRC20)",
    },
    {
      name: "BTC - Bitcoin",
      logo: <BTCIcon />,
      popularName: "Bitcoin",
      paymentAddress: "0xa435905664601dbba3fbe00431de7169a85dba55",
      supportedNetwork: "Ethereum (ERC20)",
    },
    {
      name: "ETH - Ethereum",
      logo: <ETHIcon />,
      popularName: "Ethereum",
      paymentAddress: "0xa435905664601dbba3fbe00431de7169a85dba55",
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

  const goToDashBoard = () => {
    window.location.href = "/dashboard";
  };

  return (
    <>
      <nav className="bg-navBarLightBg dark:bg-navBarDarkBg border-b border-navBarBorderLight dark:border-navBarBorderDark tablet:px-10 px-6 py-4 fixed top-0 left-0 z-10 w-full backdrop-blur-sm">
        <div className="wrapper relative flex space-x-2 justify-between mobile_lg:justify-center items-center h-[50px]">
          <Logo />
          <div className="left hidden mobile_lg:block absolute left-0">
            <LanguageSelector className={`left-0`} />
          </div>
          <div className="right mobile_lg:absolute right-0">
            <DarkModeToggle />
          </div>
        </div>
      </nav>
      <div
        style={{
          display: showBuyAndTrade ? "block" : "none",
        }}
        className={`buy-and-trade-section mt-36 max-w-[720px] mx-auto text-benBlue-lightB dark:text-benBlue-200`}
      >
        <div className="header text-center my-8 px-4">
          <h2 className="font-bold text-2xl mobile_lg:text-3xl text-benBlue-400 dark:text-benOrange-400">
            Hi, {userName}
          </h2>
          <div className="info mt-4">
            <p>
              Benarbitrage recommends using stable cryptos like USDT, TUSD and
              USDC for asset purchases, to eliminate risks associated with
              market volatility.
            </p>
          </div>
        </div>
        <div className="wrapper px-2">
          <div className="body-wrapper bg-benWhite dark:bg-benBlue-400 border border-navBarBorderLight dark:border-navBarBorderDark drop-shadow-sm rounded-xl overflow-hidden">
            <div className="header px-4 py-5 bg-[#f1f1f4] dark:bg-[#413f6e] border-b border-navBarBorderLight dark:border-navBarBorderDark">
              <h2 className="font-bold text-lg tablet:text-xl">
                Asset Purchase
              </h2>
            </div>
            <div className="body px-4 py-5">
              <div className="purchase-details">
                <div className="header font-bold text-base py-2 px-4 bg-[#e6e6ea] dark:bg-benBlue-lightC rounded-xl">
                  <h3>Purchase details</h3>
                </div>
                <div className="purchase-details-body px-4">
                  <div className="row flex py-2 border-b border-benBlue-100 dark:border-benBlue-lightB font-medium">
                    <div className="column title w-[300px]">
                      <h4>Asset name</h4>
                    </div>
                    <div className="column description flex-none">
                      <p>{assetName}</p>
                    </div>
                  </div>
                  <div className="row flex py-2 border-b border-benBlue-100 dark:border-benBlue-lightB font-medium">
                    <div className="column title w-[300px]">
                      <h4>Purchase amount</h4>
                    </div>
                    <div className="column description flex-none">
                      <p>${assetAmount}.00</p>
                    </div>
                  </div>
                  <div className="row flex py-2 border-b border-benBlue-100 dark:border-benBlue-lightB font-medium">
                    <div className="column title w-[300px]">
                      <h4>Transaction fee</h4>
                    </div>
                    <div className="column description flex-none">
                      <p>$0.00</p>
                    </div>
                  </div>
                  <div className="row text-center pt-8">
                    <h4>Total amount</h4>
                    <p className="text-xl tablet:text-2xl font-bold mt-2">
                      ${assetAmount}.00
                    </p>
                  </div>
                </div>
              </div>

              <div className="payment-wrapper max-w-[400px] mx-auto">
                <PaymentGuide />
                <div className="payment-container mt-4 mb-8 bg-white dark:bg-benBlue-lightC drop-shadow-sm rounded-2xl">
                  <div className="header flex justify-between p-4">
                    <div className="payment-method flex gap-3 items-center">
                      <div className="payment-logo-wrapper w-[52px] h-[52px] flex justify-center items-center p-1 rounded-xl border-2 border-navBarBorderLight dark:border-benBlue-lightC2">
                        {paymentMethod[pMtdIndex].logo}
                      </div>

                      <div>
                        <p>Pay using</p>
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
                        {paymentMethod[pMtdIndex].popularName} Payment Address
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
                            ? "Confirmed"
                            : txConfirmStatus === "already-confirmed"
                            ? "Already Confirmed"
                            : txConfirmStatus === "error"
                            ? "Confirmation error"
                            : txConfirmStatus === "try-again"
                            ? "Try again"
                            : "Confirm purchase"}
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
                <div className="info text-center font-medium text-xs tablet:text-sm  rounded-xl">
                  <p>
                    After asset purchase, click the "Trade with AI" button below
                    to start trading.
                  </p>
                </div>
              </div>

              <div className="action-btns mt-8 flex justify-center gap-2">
                <button
                  onClick={goToDashBoard}
                  disabled={
                    txConfirmStatus === "confirmed" ||
                    txConfirmStatus === "already-confirmed"
                      ? false
                      : true
                  }
                  className={`${
                    txConfirmStatus === "confirmed" ||
                    txConfirmStatus === "already-confirmed"
                      ? ""
                      : "cursor-not-allowed"
                  } flex gap-4 justify-between items-center bg-benBlue-lightC ${
                    txConfirmStatus === "confirmed" ||
                    txConfirmStatus === "already-confirmed"
                      ? "text-benOrange-300 w-[160px] mobile_lg:w-[175px]"
                      : "text-benBlue-100 w-[150px]"
                  } ring-offset-2 focus:ring-2 active:scale-[0.9] ring-offset-benWhite dark:ring-offset-benBlue-400 ring-benBlue-lightD drop-shadow-sm rounded-xl py-2 px-4 text-center font-medium text-base tablet:text-lg`}
                >
                  <span className="flex-none">Trade with AI </span>
                  <svg
                    viewBox="304.979 286.906 14.83 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`trade-with-ai-arrow flex-none h-auto w-3 fill-benOrange-300 ${
                      txConfirmStatus === "confirmed" ||
                      txConfirmStatus === "already-confirmed"
                        ? ""
                        : "hidden"
                    }`}
                  >
                    <path
                      d="M 303.224 291.491 L 312.394 300.661 L 321.564 291.491 L 324.394 294.321 L 312.394 306.321 L 300.394 294.321 L 303.224 291.491 Z"
                      style={{ transformOrigin: "312.394px 298.906px" }}
                      transform="matrix(0, -1, 1, 0, -0.000018119812, 0)"
                    />
                  </svg>
                </button>
                <button
                  onClick={goToDashBoard}
                  className="bg-benBlue-100 dark:bg-benBlueLight/70 text-benBlue-lightC2 dark:text-benBlue-200 ring-offset-2 focus:ring-2 active:scale-[0.9] ring-offset-benWhite dark:ring-offset-benBlue-400 ring-benBlue-lightD drop-shadow-sm rounded-xl w-fit py-2 px-4 text-center font-medium text-base tablet:text-lg"
                >
                  Trade later
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer text-center mt-20 mb-8">
          <CopyRight />
        </div>
      </div>
      <div
        className={`buy-and-trade-loader ${
          showloader ? "" : "hidden"
        } absolute top-[200px] left-[50%] translate-x-[-50%]`}
      >
        <LoadingSpinner />
      </div>
    </>
  );
}
