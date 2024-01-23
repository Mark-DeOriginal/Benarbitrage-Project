import React, { useEffect, useState } from "react";
import cryptoImg from "../assets/crypto-img.jpg";

export default function PaymentGuide() {
  const [showGuide, setShowGuide] = useState(false);

  const toggleShowGuide = () => {
    setShowGuide((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showGuide && !event.target.closest(".popup-component")) {
        setShowGuide(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showGuide]);

  return (
    <div className="popup-component mt-8 relative">
      <button
        onClick={() => toggleShowGuide()}
        className="show-guide-btn text-center text-sm active:scale-[0.95] border-b border-dotted bg-transparent border-benBlue-200 font-medium block w-fit mx-auto text-errorColor"
      >
        How do I pay with Crypto?
      </button>

      <div
        className={`${
          showGuide ? "absolute" : "hidden"
        } popup-wrapper bg-[#dadae7f0] text-benBlue-lightB dark:text-benBlue-lightB z-10 w-[90%] right-0 top-[30px] rounded-lg text-sm mobile:text-base py-3 px-4`}
      >
        <div className="popup h-[435px] overflow-auto">
          <div className="guide-header">
            <h3 className="font-bold text-base mobile_lg:text-lg">
              Here's a guide on making payments with Crypto
            </h3>
          </div>
          <div className="guide-body mt-4">
            <img
              src={cryptoImg}
              alt="Logo"
              loading="eager"
              className="rounded-lg mb-4 w-[160px] mobile_lg:w-[200px] h-auto"
            />
            <p>
              <b>Get a Crypto Wallet: </b>This is where you'll store your
              cryptocurrency. Popular options include Coinbase, Trust Wallet,
              Binance, and MetaMask. Choose one that fits your needs and
              security preferences.
            </p>
            <p>
              <b>Fund Your Wallet: </b>You can buy crypto directly through your
              chosen wallet or via a crypto exchange like Binance. Choose your
              preferred currency and method of purchase (debit card, bank
              transfer, etc.).
            </p>
            <p>
              <b>Get the Payment Address: </b>This is the address you will be
              making the payment to. It's a long string of alphanumeric
              characters called "address." Copy it.
            </p>
            <p>
              <b>Make the payment: </b>Open your wallet app and click the send
              button. You will be required to choose the Blockchain network
              associated with the address (eg. TRC20, ERC20, etc.) After that,
              paste the copied address into the appropriate field, input the
              amount you wish to pay and initiate the transaction.
            </p>
            <p>
              To enable Benarbitrage confirm your payment, copy the Transaction
              ID (txID) from your payment receipt and paste it in the
              Transaction ID field on Benarbitrage, then click the "Confirm
              Purchase" button.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
