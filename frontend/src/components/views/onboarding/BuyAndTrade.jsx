import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../LoadingSpinner";
import { CopyIcon } from "../../icons";
import {
  BTCIcon,
  BUSDIcon,
  ETHIcon,
  USDCIcon,
  USDTIcon,
} from "../../payMtdIcons";
import CopyRight from "../../Copyright";
import Logo from "../../BenarbitrageLogo";
import DarkModeToggle from "../../DarkModeToggle";
import LanguageSelector from "../../LanguageSelector";

export default function BuyAndTrade() {
  const [showloader, setShowLoader] = useState(true);
  const [showBuyAndTrade, setShowBuyAndTrade] = useState(false);

  const delay = 4000;

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setShowLoader(false);
      setShowBuyAndTrade(true);
    }, delay);

    return () => clearTimeout(timeOut);
  }, []);

  const [transactionId, setTransactionId] = useState("");
  const [isTxIdError, setIsTxIdError] = useState(false);

  const handleTxIdChange = (e) => {
    setTransactionId(e.target.value);
    setIsTxIdError(false);
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
      assetAmount: parseString(useParams().assetAmount),
      userName: parseString(useParams().userName),
    };
  };
  const { assetName, assetAmount, userName } = parsedUrlParams();

  const processPayment = (event) => {
    event.preventDefault();

    const paymentDetails = {
      assetPurchased: assetName,
      purchaseAmount: assetAmount,
      transactionId: transactionId,
    };

    if (transactionId.trim() === "") {
      setIsTxIdError(true);
    } else {
      alert(paymentDetails.transactionId);
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
      paymentAddress: "0xb329Abdd1B2639bbeC601e379DFcC3f68FEfbF31",
      recommended: true,
    },
    {
      name: "USD Coin - USDC",
      logo: <USDCIcon />,
      popularName: "USD Coin",
      paymentAddress: "0xb329Abdd1B2639bbeC601e379DFcC3f68FEfbF31",
    },
    {
      name: "Binance USD",
      logo: <BUSDIcon />,
      popularName: "Binance USD",
      paymentAddress: "0xb329Abdd1B2639bbeC601e379DFcC3f68FEfbF31",
    },
    {
      name: "Bitcoin - BTC",
      logo: <BTCIcon />,
      popularName: "Bitcoin",
      paymentAddress: "0xa435905664601dbba3fbe00431de7169a85dba55",
    },
    {
      name: "Ethereum - ETH",
      logo: <ETHIcon />,
      popularName: "Ethereum",
      paymentAddress: "0xa435905664601dbba3fbe00431de7169a85dba55",
    },
  ]);

  const paymentNetwork = "Ethereum (ERC20)";

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
      <div className="bg-navBarLightBg dark:bg-navBarDarkBg border-b border-navBarBorderLight dark:border-navBarBorderDark tablet:px-10 px-6 py-4 fixed top-0 left-0 z-10 w-full backdrop-blur-sm">
        <div className="wrapper relative flex space-x-2 justify-between mobile_lg:justify-center items-center h-[50px]">
          <Logo />
          <div className="left hidden mobile_lg:block absolute left-0">
            <LanguageSelector className={`left-0`} />
          </div>
          <div className="right mobile_lg:absolute right-0">
            <DarkModeToggle />
          </div>
        </div>
      </div>
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
              Benarbitrage recommends using stable cryptos like USDT, BUSD and
              USDC for asset purchases, to eliminate risks associated with
              market instabilities.
            </p>
          </div>
        </div>
        <div className="wrapper px-4">
          <div className="body-wrapper bg-benWhite dark:bg-benBlue-400 border border-navBarBorderLight dark:border-navBarBorderDark drop-shadow-sm rounded-xl overflow-hidden">
            <div className="header px-4 py-5 bg-[#f1f1f4] dark:bg-[#413f6e] border-b border-navBarBorderLight dark:border-navBarBorderDark">
              <h2 className="font-bold text-lg tablet:text-xl">Buy & Trade</h2>
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
                <div className="payment-container my-8 bg-white dark:bg-benBlue-lightC drop-shadow-sm rounded-2xl">
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
                        value={paymentNetwork}
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
                          Transaction ID
                        </label>
                        <input
                          type="text"
                          id="txId"
                          value={transactionId}
                          onChange={handleTxIdChange}
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
                              Transaction ID is required to confirm payment
                            </p>
                          )
                        }
                        <button
                          type="submit"
                          className="bg-benBlue-100 dark:bg-benBlue-lightE text-benBlue-lightC2 dark:text-benBlue-100 active:scale-[0.95] rounded-xl w-full py-2 px-4 text-center font-medium text-base tablet:text-lg mt-4"
                        >
                          Confirm Payment
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
                <button className="bg-benBlue-lightE text-benBlue-100 ring-offset-2 focus:ring-2 active:scale-[0.9] ring-offset-benWhite dark:ring-offset-benBlue-400 ring-benBlue-lightD drop-shadow-sm rounded-xl w-fit py-2 px-4 text-center font-medium text-base tablet:text-lg">
                  Trade with AI
                </button>
                <button className="bg-benBlue-100 dark:bg-benBlueLight/70 text-benBlue-lightC2 dark:text-benBlue-200 ring-offset-2 focus:ring-2 active:scale-[0.9] ring-offset-benWhite dark:ring-offset-benBlue-400 ring-benBlue-lightD drop-shadow-sm rounded-xl w-fit py-2 px-4 text-center font-medium text-base tablet:text-lg">
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
