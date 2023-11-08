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

function App() {
  const pageUrl = window.location.pathname;

  console.log(pageUrl);

  // Codes here run once this NavBar Component is mounted, which is on page load

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
      // Add the "dark" class to the document's <html> element
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
    ) : pageUrl === "/get-started" ? (
      <>
        <MetaData
          title="Get Started"
          description="Sign up and start trading with AI."
          themeColor={themeColor}
        />
        <GetStartedSection />
      </>
    ) : pageUrl === "/login" ? (
      <>
        <MetaData
          title="Login"
          description="Login and continue with your account."
          themeColor={themeColor}
        />
        <LoginSection />
      </>
    ) : pageUrl === "/dashboard" ? (
      <>
        <MetaData
          title="Dashboard"
          description="Welcome to your dashboard."
          themeColor={themeColor}
        />
        <UserDashboard />
      </>
    ) : (
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
    );

  return <HelmetProvider>{pageContent}</HelmetProvider>;
}

export default App;
