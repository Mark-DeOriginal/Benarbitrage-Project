import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDarkMode } from "./redux-states/uiSlice.js";
import { Helmet, HelmetProvider } from "react-helmet-async";
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
import ReferrerSignUpPage from "./pages/referrer-signup.jsx";
import ReferrerLoginPage from "./pages/referrer-login.jsx";
import AffiliateDashboardPage from "./pages/affiliate-dashboard.jsx";
import CheckPointPage from "./pages/checkpoint.jsx";

export function redirectTo(location) {
  window.location.href = location;
}

function App() {
  const pageUrl = window.location.pathname;

  // Our color scheme is dark by default
  var isDark = true;
  var themeColor = "#434172";

  // Check if we have "isDarkMode" set in the Browser's localStorage before proceeding
  // If it's set, then the User changed the color scheme
  if (localStorage.getItem("isDarkMode")) {
    // So get the User's choice scheme
    const isDarkMode = localStorage.getItem("isDarkMode");
    // If the User chose light mode
    if (isDarkMode === "false") {
      // remove the "dark" class from the document's <html> element
      document.documentElement.classList.remove("dark");

      themeColor = "#eeeef1";

      // And set this variable to false
      isDark = false;
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
        />
        <RootLayout>
          <LearnPage />
        </RootLayout>
      </>
    ) : pageUrl === "/checkpoint" ? (
      <>
        <MetaData title="Checkpoint" />
        <RootLayout showHiring={false}>
          <CheckPointPage />
        </RootLayout>
      </>
    ) : pageUrl === "/affiliate/signup" ? (
      <>
        <MetaData
          title="Affiliate Sign Up"
          description="Become an affiliate and start earning on Benarbitrage."
        />
        <ReferrerSignUpPage />
      </>
    ) : pageUrl === "/affiliate/login" ? (
      <>
        <MetaData
          title="Affiliate Login"
          description="Login to your affiliate account to manage it."
        />
        <ReferrerLoginPage />
      </>
    ) : pageUrl === "/affiliate/dashboard" ? (
      <>
        <MetaData
          title="Affiliate Dashboard"
          description="Manage your affiliate account."
        />
        <AffiliateDashboardPage />
      </>
    ) : pageUrl === "/get-started" ? (
      <>
        <MetaData
          title="Get Started"
          description="Sign up and start trading with AI."
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
        />
        <LoginSection />
      </>
    ) : pageUrl === "/signup" ? (
      <>
        <MetaData
          title="Get Started"
          description="Sign up and start trading with AI."
        />
        <SignUpSection />
      </>
    ) : pageUrl === "/dashboard" &&
      isLoggedIn() &&
      getCookie("onboardingStage", "") !== "COMPLETED" ? (
      redirectTo("/get-started")
    ) : pageUrl === "/dashboard" ? (
      <>
        <MetaData title="Dashboard" description="Welcome to your dashboard." />
        <UserDashboard />
      </>
    ) : pageUrl === "/terms-of-use" ? (
      <>
        <MetaData
          title="Terms of Use"
          description="Read our terms and conditions, privacy and refund policy here."
        />
        <TermsAndConditions />
      </>
    ) : pageUrl === "/trading-area" ? (
      <>
        <MetaData title="Trading Area" description="AI Trading Area." />
        <TradingPage />
      </>
    ) : pageUrl.startsWith("/ref") || pageUrl === "/" ? (
      <>
        <MetaData
          title="Benarbitrage"
          description="Benarbitrage is an arbitrage trading platform that uses Artificial Intelligence to trade the financial market."
        />
        <RootLayout>
          <HomePage />
        </RootLayout>
      </>
    ) : (
      redirectTo("/get-started")
    );

  return (
    <HelmetProvider>
      <Helmet>
        <meta name="theme-color" content={themeColor} />
      </Helmet>
      {pageContent}
    </HelmetProvider>
  );
}

export default App;
