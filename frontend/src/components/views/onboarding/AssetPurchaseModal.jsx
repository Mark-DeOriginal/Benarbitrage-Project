import React, { useEffect, useState } from "react";
import Modal from "../../Modal";
import { ErrorIcon as CloseIcon, CopyIcon } from "../../icons";
import { useDispatch, useSelector } from "react-redux";
import { setIsBuyAssetModalOpen } from "../../../redux-states/uiSlice";
import LoadingSpinner from "../../LoadingSpinner";
import { createPortal } from "react-dom";
import {
  BTCIcon,
  BUSDIcon,
  ETHIcon,
  USDCIcon,
  USDTIcon,
} from "../../payMtdIcons";

export default function AssetPurchaseModal() {
  const isBuyAssetModalOpen = useSelector(
    (state) => state.ui.isBuyAssetModalOpen
  );

  useEffect(() => {
    const modalBg = document.querySelector(".modal-bg");
    const modalContent = document.querySelector(".modal-content");
    const loadingSpinner = document.querySelector(".loader-wrapper");

    if (modalBg && modalContent) {
      if (isBuyAssetModalOpen) {
        modalBg.style.display = "block";
        loadingSpinner.style.display = "block";

        setTimeout(() => {
          loadingSpinner.style.display = "none";
          modalContent.style.display = "block";
        }, 3000);
      } else {
        modalBg.style.animation = "0.3s ease 0.6s forwards hide-modal-bg";
        setTimeout(() => {
          modalContent.style.display = "none";

          modalBg.style.display = "none";
          modalBg.style.animation = "";
        }, 900);
      }
    }
  }, [isBuyAssetModalOpen]);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setIsBuyAssetModalOpen(false));
  };

  const purchaseDetails = useSelector((state) => state.ui.assetPurchaseDetails);

  const [transactionId, setTransactionId] = useState("");
  const [isTxIdError, setIsTxIdError] = useState(false);

  const handleTxIdChange = (e) => {
    setTransactionId(e.target.value);
    setIsTxIdError(false);
  };

  const processPayment = (event) => {
    event.preventDefault();

    const paymentDetails = {
      assetPurchased: purchaseDetails.assetName,
      purchaseAmount: purchaseDetails.purchaseAmount,
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
      <Modal className={`buy-asset-modal py-4`}>
        <div className="modal-header flex justify-between px-4 py-5 bg-benWhitishBlue dark:bg-[#413f6e] border-b border-navBarBorderLight dark:border-navBarBorderDark">
          <h2 className="font-bold text-lg tablet:text-xl">Buy & Trade</h2>
          <button onClick={closeModal} className="close-btn">
            <CloseIcon className="h-auto w-4 fill-benBlue-lightE dark:fill-benBlue-300" />
          </button>
        </div>
        <div className="modal-body bg-benWhite dark:bg-benBlue-400 px-4 py-5">
          <div className="purchase-details">
            <div className="header font-bold text-base py-2 px-4 bg-[#e6e6ea] dark:bg-benBlue-lightC rounded-xl">
              <h3>Purchase details</h3>
            </div>
            <div className="body px-4">
              <div className="row flex py-2 border-b border-benBlue-100 dark:border-benBlue-lightB font-medium">
                <div className="column title w-[300px]">
                  <h4>Asset name</h4>
                </div>
                <div className="column description flex-none">
                  <p>{purchaseDetails.assetName}</p>
                </div>
              </div>
              <div className="row flex py-2 border-b border-benBlue-100 dark:border-benBlue-lightB font-medium">
                <div className="column title w-[300px]">
                  <h4>Purchase amount</h4>
                </div>
                <div className="column description flex-none">
                  <p>${purchaseDetails.purchaseAmount}.00</p>
                </div>
              </div>
              <div className="row flex py-2 border-b border-benBlue-100 dark:border-benBlue-lightB font-medium">
                <div className="column title w-[300px]">
                  <h4>Transaction fee</h4>
                </div>
                <div className="column description flex-none">
                  <p>${purchaseDetails.transactionFee}</p>
                </div>
              </div>
              <div className="row text-center pt-8">
                <h4>Total amount</h4>
                <p className="text-xl tablet:text-2xl font-bold mt-2">
                  ${purchaseDetails.totalAmount}.00
                </p>
              </div>
            </div>
          </div>

          <div className="payment-wrapper">
            <div className="payment-container max-w-[400px] mx-auto my-8 bg-white dark:bg-benBlue-lightC shadow-navShadow drop-shadow-sm rounded-2xl">
              <div className="heading flex justify-between p-4">
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
            <div className="info text-center font-medium text-xs text-successColor dark:text-successColorDark tablet:text-sm py-2 px-4 border border-successBgColorDark dark:border-successBgColorDark bg-successBgColor/50 dark:bg-successBgColorDark/25 rounded-xl">
              <p>
                After asset purchase, click the "Trade with AI" button below to
                start trading.
              </p>
            </div>
          </div>

          <div className="action-btns mt-4 flex justify-end gap-2">
            <button className="bg-benBlue-lightE text-benBlue-100 ring-offset-2 focus:ring-2 active:scale-[0.9] ring-offset-benWhite dark:ring-offset-benBlue-400 ring-benBlue-lightD drop-shadow-sm rounded-md w-fit py-2 px-4 text-center font-medium text-base tablet:text-lg">
              Trade with AI
            </button>
            <button
              onClick={closeModal}
              className="bg-benBlue-100 dark:bg-benBlueLight/70 text-benBlue-lightC2 dark:text-benBlue-200 ring-offset-2 focus:ring-2 active:scale-[0.9] ring-offset-benWhite dark:ring-offset-benBlue-400 ring-benBlue-lightD drop-shadow-sm rounded-md w-fit py-2 px-4 text-center font-medium text-base tablet:text-lg"
            >
              Cancel
            </button>
          </div>
        </div>
        {createPortal(
          <div
            style={{ display: "none" }}
            className={`loader-wrapper fixed top-[200px] left-[50%] translate-x-[-50%] z-[15]`}
          >
            <LoadingSpinner />
          </div>,
          document.body
        )}
      </Modal>
    </>
  );
}
