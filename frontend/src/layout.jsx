import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import LiveChat from "./components/live_chat/LiveChat";
import HiringSection from "./components/HiringSection";

export default function RootLayout({ children }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <HiringSection />
      <Footer />
      <LiveChat />
    </>
        
  );
}
