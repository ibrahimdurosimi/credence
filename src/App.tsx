import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import AboutView from "./components/AboutView";
import ProductsView from "./components/ProductsView";
import PartnersView from "./components/PartnersView";
import CapitalView from "./components/CapitalView";
import MerchantsView from "./components/MerchantsView";
import ContactView from "./components/ContactView";

export default function App() {
  const [currentTab, setCurrentTab] = useState("home");

  // Sync hash links if present on load or hashchange
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      const validTabs = ["home", "about", "products", "partners", "capital", "merchants", "contact"];
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
        return <ProductsView />;
      case "partners":
        return <PartnersView />;
      case "capital":
        return <CapitalView />;
      case "merchants":
        return <MerchantsView />;
      case "contact":
        return <ContactView />;
      default:
        return <HomeView setCurrentTab={handleTabChange} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream text-purple-deep font-sans antialiased selection:bg-gold/30">
      {/* Absolute Header Overlay */}
      <Header currentTab={currentTab} setCurrentTab={handleTabChange} />

      {/* Main Content Area */}
      <main className="flex-grow">
        {renderView()}
      </main>

      {/* Consistent Luxury Footer */}
      <Footer setCurrentTab={handleTabChange} />
    </div>
  );
}
