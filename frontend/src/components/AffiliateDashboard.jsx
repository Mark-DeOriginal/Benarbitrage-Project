import React, { useEffect, useState } from "react";
import getCookie from "../utilities/getCookie";
import { useSelector } from "react-redux";
import { CaretIcon, EditIcon, LogoutIcon } from "./icons";
import LoadingSpinner from "./LoadingSpinner";
import Logo from "./BenarbitrageLogo";
import LanguageSelector from "./LanguageSelector";
import DarkModeToggle from "./DarkModeToggle";
import CopyRight from "./Copyright";
import Collapsible from "./Collapsible";
import PayoutsTable from "./affiliate/PayoutsTable";

export default function AffiliateDashboard() {
  const [showloader, setShowLoader] = useState(true);
  const [showDashboard, setShowDashboard] = useState(false);

  const delay = 2000;

  useEffect(() => {
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
  }, []);

  const [showLogout, setShowLogout] = useState(false);

  const getNameInitials = () => {
    let initials = getCookie("referrerUserName", "JD")
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .join("");

    return initials;
  };

  // const dispatch = useDispatch();
  // getAccountBalance(getCookie("accountId", ""))
  //   .then((response) => {
  //     dispatch(
  //       setAccountBalance({
  //         balance: insertDelimiters(response.walletBalance) + ".00",
  //         interest: insertDelimiters(response.accumulatedInterest) + ".00",
  //       })
  //     );
  //   })
  //   .catch(() => {
  //     dispatch(
  //       setAccountBalance({
  //         balance: "reload",
  //         interest: "reload",
  //       })
  //     );
  //   });

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

  const handleLogout = () => {
    // affiliateLogout();
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
              &gt; affiliate
              <a href="/dashboard"> &gt; dashboard</a>
            </p>
          </div>
          <div className="bg-benBlue-light dark:bg-[#4b4a73] rounded-xl">
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
                  <div className="profile-info absolute z-10 overflow-hidden top-[45px] w-60 right-0 rounded-xl shadow-cardShadow border border-navBarBorderLight dark:border-navBarBorderDark bg-benWhitishBlue dark:bg-[#4b4a73]">
                    <div className="login-details py-2 px-4">
                      <p className="user-name font-bold text-sm mobile:text-base">
                        {getCookie("referrerUserName", "User")}
                      </p>
                      <p className="user-email truncate mt-0 text-xs mobile:text-sm">
                        {getCookie("referrerUserEmail", "Not logged in")}
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
          <div className="welcome-block text-center pt-8 mobile_lg:pt-12 flex flex-col gap-4">
            <div className="welcome-message">
              <h2 className="text-lg mobile:text-xl">Welcome</h2>
              <p className="text-2xl mobile:text-3xl font-bold">Solomon Madu</p>
            </div>
            <div className="referrer-link-wrapper w-fit mx-auto text-sm mobile:text-base flex items-center p-1 pl-4 border-2 border-navBarBorderLight dark:border-navBarBorderDark rounded-full">
              <div className="referrer-link w-[120px] relative">
                <input
                  type="text"
                  value={"ref/WsdSsgwfhr2"}
                  readOnly={true}
                  className="bg-transparent w-full"
                />
                <div className="feather absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-[#ededf2] dark:from-[#3d3c62] to-transparent"></div>
              </div>
              <button className="referrer-btn flex-none bg-benBlue-light dark:bg-benBlue-lightC2 py-2 px-4 rounded-full active:scale-[0.95]">
                Copy referrer link
              </button>
            </div>
          </div>
          <div className="overview-block pt-8 mobile_lg:pt-12 space-y-4 text-sm laptop:text-xl">
            <div className="row flex justify-center gap-4">
              <div className="column w-[300px] space-y-4 bg-benWhite dark:bg-[#4b4a73] rounded-xl p-4 tablet:p-6">
                <p className="text-xl mobile:text-2xl mobile_lg:text-3xl font-bold">
                  $2,300
                </p>
                <h2>Total payouts</h2>
              </div>
              <div className="column w-[300px] space-y-4 bg-benWhite dark:bg-[#4b4a73] rounded-xl p-4 tablet:p-6">
                <p className="text-xl mobile:text-2xl mobile_lg:text-3xl font-bold">
                  $500
                </p>
                <h2>Pending payouts</h2>
              </div>
            </div>
            <div className="row flex justify-center gap-4">
              <div className="column w-[300px] space-y-4 bg-benWhite dark:bg-[#4b4a73] rounded-xl p-4 tablet:p-6">
                <p className="text-xl mobile:text-2xl mobile_lg:text-3xl font-bold">
                  23
                </p>
                <h2>Total refers</h2>
              </div>
              <div className="column w-[300px] space-y-4 bg-benWhite dark:bg-[#4b4a73] rounded-xl p-4 tablet:p-6">
                <p className="text-xl mobile:text-2xl mobile_lg:text-3xl font-bold">
                  16
                </p>
                <h2>Successful refers</h2>
              </div>
            </div>
          </div>
          <div className="info-block pt-8 mobile_lg:pt-12 space-y-2">
            <div className="payout-activities">
              <Collapsible title={`Payout activities`}>
                <div className="content py-4 overflow-x-auto">
                  <PayoutsTable />
                </div>
              </Collapsible>
            </div>
            <div className="profile-information">
              <Collapsible title={`Profile information`}>
                <div className="content py-4">
                  <p>Profile information will be displayed here.</p>
                </div>
              </Collapsible>
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
  );
}
