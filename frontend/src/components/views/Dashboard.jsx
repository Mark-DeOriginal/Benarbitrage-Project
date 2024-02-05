import React, { useEffect, useState } from "react";
import Logo from "../BenarbitrageLogo";
import LanguageSelector from "../LanguageSelector";
import DarkModeToggle from "../DarkModeToggle";
import CopyRight from "../Copyright";
import LoadingSpinner from "../LoadingSpinner";
import { CaretIcon, LogoutIcon } from "../icons";
import PaymentSystem from "../PaymentSystem";
import { scroller as scroll } from "react-scroll";
import logout from "../../utilities/logout";
import { useDispatch, useSelector } from "react-redux";
import getAccountBalance from "../../utilities/getAccountBalance";
import { setAccountBalance } from "../../redux-states/uiSlice";
import getCookie from "../../utilities/getCookie";
import insertDelimiters from "../../utilities/insertDelimiters";
import isLoggedIn from "../../utilities/isLoggedIn";
import { MetaData } from "../../metadata";
import GetStartedSection from "../../pages/get-started";

export default function BuyAndTrade() {
  const [showloader, setShowLoader] = useState(true);
  const [showDashboard, setShowDashboard] = useState(false);

  const delay = 2000;

  useEffect(() => {
    if (isLoggedIn()) {
      new Promise((resolve, reject) => {
        setTimeout(() => {
          setShowLoader(false);
          resolve();
        }, delay);
      }).then(() => {
        setTimeout(() => {
          setShowDashboard(true);
        }, 500);
      });
    } else {
      history.pushState(null, "", "/get-started");
    }
  }, []);

  const [showLogout, setShowLogout] = useState(false);

  const getNameInitials = () => {
    let initials = getCookie("userName", "JD")
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .join("");

    return initials;
  };

  const dispatch = useDispatch();
  getAccountBalance(getCookie("accountId", ""))
    .then((response) => {
      dispatch(
        setAccountBalance({
          balance: insertDelimiters(response.walletBalance) + ".00",
          interest: insertDelimiters(response.accumulatedInterest) + ".00",
        })
      );
    })
    .catch(() => {
      dispatch(
        setAccountBalance({
          balance: "reload",
          interest: "reload",
        })
      );
    });

  const walletBalance = useSelector((state) => state.ui.accountBalance.balance);
  const accumulatedInterest = useSelector(
    (state) => state.ui.accountBalance.interest
  );

  const toggleShowLogout = () => {
    setShowLogout((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showLogout && !event.target.closest(".profile-wrapper")) {
        setShowLogout(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showLogout]);

  const [showDepositConfirmer, setShowDepositConfirmer] = useState(false);
  const [depositInstance, setDepositInstance] = useState(0);

  const handleDeposit = () => {
    if (showDepositConfirmer === false) {
      setShowDepositConfirmer(true);
      setTimeout(() => {
        scroll.scrollTo("money-deposit-block", {
          duration: 800,
          smooth: "easeInOutQuart",
          offset: -70,
        });
      }, 500);
    } else {
      setDepositInstance((prev) => prev + 1);

      scroll.scrollTo("money-deposit-block", {
        duration: 800,
        smooth: "easeInOutQuart",
        offset: -70,
      });
    }
  };

  const [showInfo, setShowInfo] = useState(false);

  const [shouldReact, setShouldReact] = useState(false);

  const handleFundWithdrawal = () => {
    setShowInfo(true);
    setShouldReact(true);
    setTimeout(() => {
      setShouldReact(false);
    }, 100);
  };

  const handleFundTransfer = () => {
    setShowInfo(true);
    setShouldReact(true);
    setTimeout(() => {
      setShouldReact(false);
    }, 100);
  };

  const handleLogout = () => {
    logout("user", "/login");
  };

  return isLoggedIn() ? (
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
          display: showDashboard ? "block" : "none",
        }}
        className={`dashboard mt-32 mobile_lg:mt-36 max-w-[720px] mx-auto text-benBlue-lightB dark:text-benBlue-200`}
      >
        <div className="wrapper px-2 space-y-2">
          <div className="bread-crumb text-sm tablet:text-base mb-6 px-4 tablet:px-6">
            <p>
              <span className="text-benBlue-lightB/60 dark:text-benBlue-lightE">
                benarbitrage
              </span>{" "}
              <a href="/dashboard">&gt; dashboard</a>
            </p>
          </div>
          <div className="user-name-block bg-benWhite dark:bg-[#4b4a73] rounded-xl">
            <div className="block-content px-4 tablet:px-6 py-4 flex justify-between items-center">
              <h1 className="text-lg tablet:text-xl font-bold dark:text-benOrange-400">
                DASHBOARD
              </h1>
              <div className="profile-wrapper relative">
                <button
                  onClick={() => toggleShowLogout()}
                  className="profile-btn flex gap-2 items-center border border-navBarBorderLight dark:border-navBarBorderDark bg-benWhitishBlue dark:bg-benBlue-lightC/60 p-[4px] pr-2 rounded-full active:scale-[0.95]"
                >
                  <div className="name-icon bg-benBlue-light dark:bg-benBlue-lightC2 h-7 w-12 rounded-full flex items-center justify-center">
                    <span className="text-base font-extrabold">
                      {getNameInitials()}
                    </span>
                  </div>
                  <CaretIcon className={`fill-benBlue-300`} />
                </button>
                {showLogout && (
                  <div className="profile-info absolute overflow-hidden top-[45px] w-60 right-0 rounded-xl shadow-cardShadow border border-navBarBorderLight dark:border-navBarBorderDark bg-benWhitishBlue dark:bg-[#4b4a73]">
                    <div className="login-details py-2 px-4">
                      <p className="user-name font-bold text-sm mobile:text-base">
                        {getCookie("userName", "User")}
                      </p>
                      <p className="user-email truncate mt-0 text-xs mobile:text-sm">
                        {getCookie("userEmail", "Not logged in")}
                      </p>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="logout flex gap-2 items-center py-3 px-4 w-full hover:bg-benBlue-100/60 hover:dark:bg-benBlue-lightC/90"
                    >
                      <LogoutIcon className={`fill-benBlue-300`} />
                      <p className="text-base font-medium">Logout</p>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="balance-and-operations-block">
            <div className="block-content max-w-[400px] mx-auto pt-8 mobile_lg:pt-12 pb-4">
              <div
                name="balance"
                className="balance px-4 flex justify-between gap-4 dark:text-benBlue-lightD"
              >
                <div className="portfolio-balance">
                  <h2 className="text-sm mobile:text-base">Wallet balance</h2>
                  <p className="text-2xl mobile:text-3xl font-bold">
                    ${walletBalance}
                  </p>
                </div>
                <div className="accumulated-interest flex-none">
                  <h2 className="text-sm mobile:text-base">Interest arrears</h2>
                  <p className="text-2xl mobile:text-3xl font-bold">
                    ${accumulatedInterest}
                  </p>
                </div>
              </div>
              <div className="operations mt-4 bg-benWhite dark:bg-[#4b4a73] rounded-xl flex justify-between mobile_lg:gap-2 px-4 py-2">
                <button
                  onClick={handleDeposit}
                  className="font-medium mobile_lg:flex-1 bg-benBlue-light dark:bg-benBlue-lightC2 px-4 py-2 rounded-xl active:scale-[0.95]"
                >
                  Deposit
                </button>
                <button
                  onClick={handleFundWithdrawal}
                  className="font-medium mobile_lg:flex-1 bg-benBlue-light dark:bg-benBlue-lightC2 px-4 py-2 rounded-xl active:scale-[0.95]"
                >
                  Withdraw
                </button>
                <button
                  onClick={handleFundTransfer}
                  className="font-medium mobile_lg:flex-1 bg-benBlue-light dark:bg-benBlue-lightC2 px-4 py-2 rounded-xl active:scale-[0.95]"
                >
                  Transfer
                </button>
              </div>
            </div>
          </div>

          <div
            className={`info-block bg-benWhite dark:bg-[#4b4a73] rounded-xl ${
              shouldReact ? "scale-[0.95]" : ""
            } ${showInfo == false ? "hidden" : ""}`}
          >
            <div className="block-content px-4 tablet:px-6 py-4 text-xs mobile_lg:text-sm">
              <h2 className="text-sm font-bold mb-2">Soon to be reactivated</h2>
              <p>
                Benarbitrage is working to reactivate the Funds Withdrawal and
                Fund Transfer feature across all User accounts. Be assured that
                your funds are safe and cannot be tampered with.
              </p>
            </div>
          </div>
          <div
            name="money-deposit-block"
            className={`${
              showDepositConfirmer ? "block" : "hidden"
            } money-deposit-block bg-benWhite dark:bg-[#4b4a73] rounded-xl`}
          >
            <div className="block-content px-4 tablet:px-6 py-4">
              <div className="header max-w-[500px] mx-auto text-sm mobile_lg:text-base text-center mt-4 space-y-2">
                <h1 className="text-lg tablet:text-xl font-bold dark:text-benOrange-400">
                  Deposit to Wallet
                </h1>
                <p>
                  The deposit amount should reflect automatically in your
                  Benarbitrage wallet once deposit is confirmed.
                </p>
              </div>
              <div key={depositInstance} className="confirm-payment-wrapper">
                <PaymentSystem />
              </div>
            </div>
          </div>
          <div className="general-info-block bg-benWhite dark:bg-[#4b4a73] rounded-xl">
            <div className="block-content px-4 tablet:px-6 py-4">
              <p>
                Benarbitrage lost it's case to continue using AI for Crypto
                Arbitrage Trading. The trading industry has always been about
                making profits and losing, but Benarbitrage brought a new
                dimension by leveraging the power of its AI System. This caused
                quite a stir, leading to constant cyber and legal attacks.
                Despite our success in countering cyber threats, the legal
                battles have prompted us to temporarily shut down our AI Trading
                System. We're always committed to the interest of our Users, and
                therefore came up with the Benarbitrage Savings Feature. Users
                will get 6.2% interest on any fund they deposit in their wallet
                (higher than any other savings platform). During this period of
                temporary shut down of our AI Trading System, it'll will be an
                alternative way for Users to grow the money in their wallet.
                Once we're able to get our AI Trading System back up, trading
                operations will resume and all Benarbitrage Users will be
                notified. Please keep an eye on your email.
              </p>
              <p>
                <b>Steve Henry Schwartz</b>
                <br />
                User Relations Lead, <br />
                Benarbitrage
              </p>
            </div>
          </div>
        </div>

        <div className="footer text-center mt-20 mb-8">
          <CopyRight />
        </div>
      </div>
      <div
        className={`dashboard-loader ${
          showloader ? "" : "hidden"
        } absolute top-[200px] left-[50%] translate-x-[-50%]`}
      >
        <LoadingSpinner />
      </div>
    </>
  ) : (
    <>
      <MetaData
        title="Get Started"
        description="Sign up and start trading with AI."
      />
      <GetStartedSection />
    </>
  );
}
