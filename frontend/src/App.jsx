import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDarkMode } from "./redux-states/uiSlice.js";
import { HelmetProvider } from "react-helmet-async";
import { MetaData } from "./metadata";
import "./App.css";
import "./styles/form.css";

import HomePage from "./pages/home";
import LearnPage from "./pages/learn";
import RootLayout from "./layout";
import GetStartedSection from "./pages/get-started.jsx";
import LoginSection from "./pages/login.jsx";
import UserDashboard from "./pages/dashboard.jsx";
import BuyAndTradeSection from "./pages/buy-and-trade.jsx";
import SignUpSection from "./pages/signup.jsx";
import isLoggedIn from "./utilities/isLoggedIn.js";
import TermsAndConditions from "./pages/terms-of-use.jsx";
import getCookie from "./utilities/getCookie.js";

import TradingPage from "./pages/trade-area.jsx";
import setCookie from "./utilities/setCookie.js";
import deleteAllCookies from "./utilities/deleteCookies.js";
import ReferrerSignUpPage from "./pages/referrer-signup.jsx";
import ReferrerLoginPage from "./pages/referrer-login.jsx";
import AffiliateDashboardPage from "./pages/affiliate-dashboard.jsx";

export function redirectTo(location) {
  window.location.href = location;
}

function App() {
  const pageUrl = window.location.pathname;

  // We'll call this function whenever we want to delete our cookies from the User's browser
  // deleteAllCookies();
  // localStorage.clear();

  // Our color scheme is light by default
  var isDark = false;
  var themeColor = "#eeeef1";

  // Check if we have "isDarkMode" set in the Browser's localStorage before proceeding
  // If it's set, then the User changed the color scheme
  if (localStorage.getItem("isDarkMode")) {
    // So get the User's choice scheme
    const isDarkMode = localStorage.getItem("isDarkMode");
    // If the User chose dark mode
    if (isDarkMode === "true") {
      // add the "dark" class to the document's <html> element
      document.documentElement.classList.add("dark");

      themeColor = "#434172";

      // And set this variable to true
      isDark = true;
    }
  }

  const dispatch = useDispatch();

  // Once the "isDark" variable changes, update the darkMode state accordingly
  useEffect(() => {
    dispatch(setDarkMode(isDark));
  }, [isDark]);

  // Set the Referral ID in the cookie if user was referred
  if (pageUrl.startsWith("/ref/")) {
    const refID = pageUrl.slice(5, pageUrl.length);
    setCookie("refID", refID);
  }

  const pageContent =
    pageUrl === "/learn" ? (
      <>
        <MetaData
          title="What is Arbitrage Trading?"
          description="Learn what arbitrage trading is and how you can trade smarter with AI."
          themeColor={themeColor}
        />
        <RootLayout>
          <LearnPage />
        </RootLayout>
      </>
    ) : pageUrl === "/affiliate/signup" ? (
      <>
        <MetaData
          title="Affiliate Sign Up"
          description="Become an affiliate and start earning on Benarbitrage."
          themeColor={themeColor}
        />
        <ReferrerSignUpPage />
      </>
    ) : pageUrl === "/affiliate/login" ? (
      <>
        <MetaData
          title="Affiliate Login"
          description="Login to your affiliate account to manage it."
          themeColor={themeColor}
        />
        <ReferrerLoginPage />
      </>
    ) : pageUrl === "/affiliate/dashboard" ? (
      <>
        <MetaData
          title="Affiliate Dashboard"
          description="Manage your affiliate account."
          themeColor={themeColor}
        />
        <AffiliateDashboardPage />
      </>
    ) : pageUrl === "/get-started" ? (
      <>
        <MetaData
          title="Get Started"
          description="Sign up and start trading with AI."
          themeColor={themeColor}
        />
        <GetStartedSection />
      </>
    ) : pageUrl.startsWith("/buy-and-trade") ? (
      <BuyAndTradeSection />
    ) : pageUrl === "/login" ? (
      <>
        <MetaData
          title="Login"
          description="Login and continue with your account."
          themeColor={themeColor}
        />
        <LoginSection />
      </>
    ) : pageUrl === "/signup" ? (
      <>
        <MetaData
          title="Get Started"
          description="Sign up and start trading with AI."
          themeColor={themeColor}
        />
        <SignUpSection />
      </>
    ) : pageUrl === "/dashboard" &&
      isLoggedIn() &&
      getCookie("onboardingStage", "") !== "COMPLETED" ? (
      redirectTo("/get-started")
    ) : pageUrl === "/dashboard" ? (
      <>
        <MetaData
          title="Dashboard"
          description="Welcome to your dashboard."
          themeColor={themeColor}
        />
        <UserDashboard />
      </>
    ) : pageUrl === "/terms-of-use" ? (
      <>
        <MetaData
          title="Terms of Use"
          description="Read our terms and conditions, privacy and refund policy here."
          themeColor={themeColor}
        />
        <TermsAndConditions />
      </>
    ) : pageUrl === "/trading-area" ? (
      <>
        <MetaData
          title="Trading Area"
          description="AI Trading Area."
          themeColor={themeColor}
        />
        <TradingPage />
      </>
    ) : pageUrl.startsWith("/ref") || pageUrl === "/" ? (
      <>
        <MetaData
          title="Benarbitrage"
          description="Benarbitrage is an arbitrage trading platform that uses Artificial Intelligence to trade the financial market."
          themeColor={themeColor}
        />
        <RootLayout>
          <HomePage />
        </RootLayout>
      </>
    ) : (
      redirectTo("/get-started")
    );

  return <HelmetProvider>{pageContent}</HelmetProvider>;
}

export default App;
