import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import AboutView from "./components/AboutView";
import ProductsView from "./components/ProductsView";
import BuildView from "./components/BuildView";
import ContactView from "./components/ContactView";
import FloatingAdvisor from "./components/FloatingAdvisor";
import AdvisorView from "./components/AdvisorView";

import AdminView from "./components/AdminView";

export default function App() {
  const [currentTab, setCurrentTab] = useState("home");

  // Sync hash links if present on load or hashchange
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      const validTabs = ["home", "about", "products", "build", "contact", "advisor", "admin"];
      if (validTabs.includes(hash)) {
        setCurrentTab(hash);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Update URL hash safely when tab changes
  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    window.location.hash = tab;
  };

  const renderView = () => {
    switch (currentTab) {
      case "home":
        return <HomeView setCurrentTab={handleTabChange} />;
      case "about":
        return <AboutView />;
      case "products":
        return <ProductsView setCurrentTab={handleTabChange} />;
      case "build":
        return <BuildView setCurrentTab={handleTabChange} />;
      case "advisor":
        return <AdvisorView setCurrentTab={handleTabChange} />;
      case "contact":
        return <ContactView />;
      case "admin":
        return <AdminView />;
      default:
        return <HomeView setCurrentTab={handleTabChange} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream text-purple-deep font-sans antialiased selection:bg-gold/30 relative">
      {/* Absolute Header Overlay */}
      {currentTab !== "advisor" && <Header currentTab={currentTab} setCurrentTab={handleTabChange} />}

      {/* Main Content Area */}
      <main className={`flex-grow ${currentTab !== "advisor" ? "pt-[72px]" : ""}`}>
        {renderView()}
      </main>

      {/* Persistent Floating Advisor Widget */}
      {currentTab !== "advisor" && <FloatingAdvisor setCurrentTab={handleTabChange} />}

      {/* Consistent Luxury Footer */}
      {currentTab !== "advisor" && <Footer setCurrentTab={handleTabChange} />}
    </div>
  );
}
