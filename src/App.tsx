import React, { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { initAuth, googleSignIn } from "./lib/firebase";
import { ShieldCheck } from "lucide-react";

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
import ThemePopup from "./components/ThemePopup";
import UmaizaLandingView from "./components/UmaizaLandingView";

export default function App() {
  const [currentTab, setCurrentTab] = useState("home");
  const [user, setUser] = useState<User | null>(null);
  const [needsAuth, setNeedsAuth] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showThemePopup, setShowThemePopup] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem("app-theme");
    if (savedTheme === "dark") {
      setIsDarkTheme(true);
      document.documentElement.classList.add("dark-theme");
    } else if (!savedTheme) {
      // Show popup on first load
      setShowThemePopup(true);
    }

    const unsubscribe = initAuth(
      (user) => {
        setUser(user);
        setNeedsAuth(false);
      },
      () => {
        // setNeedsAuth(true); // Temporarily disabled
      }
    );
    return () => unsubscribe();
  }, []);

  const [loginError, setLoginError] = useState<string | null>(null);

  // Sync hash links if present on load or hashchange
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      const validTabs = ["home", "about", "products", "build", "contact", "advisor", "admin", "umaiza"];
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

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setNeedsAuth(false);
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      // Make error human readable
      if (err.message?.includes('requests-from-referer')) {
        setLoginError("Your Google Cloud API Key is blocking this URL. Please go to Google Cloud Console > Credentials > API Keys and add this URL to the website restrictions.");
      } else if (err.message?.includes('popup-blocked')) {
        setLoginError("Sign-in popup was blocked by your browser. Please allow popups for this site, or open it in a new tab.");
      } else {
        setLoginError(err.message || "Login failed. Please try again.");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (needsAuth && (currentTab === "advisor" || currentTab === "admin")) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-6 text-purple-deep">
        <div className="bg-white rounded-2xl shadow-sm border border-purple-deep/10 p-8 max-w-sm w-full text-center">
          <ShieldCheck className="w-12 h-12 text-[#D4A843] mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold text-purple-deep mb-2">Welcome to Credence</h2>
          <p className="text-purple-deep opacity-70 mb-6 text-[14px] leading-relaxed">
            Please sign in with your Google account. This helps Umaiza remember your preferences and provide personalized, ethical financial advice.
          </p>
          
          {loginError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl text-left select-text">
              <span className="font-semibold block mb-1">Sign-in Error:</span>
              <span>{loginError}</span>
            </div>
          )}

          <button 
            onClick={handleLogin} 
            disabled={isLoggingIn}
            className="w-full relative shadow-md bg-white border border-purple-deep/10 text-purple-deep font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-3 hover:bg-cream-mid transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
            {isLoggingIn ? "Signing in..." : "Continue with Google"}
          </button>
          
          <button 
             onClick={() => handleTabChange("home")}
             className="mt-6 text-sm font-medium text-purple-deep opacity-60 hover:opacity-100"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  const renderView = () => {
    switch (currentTab) {
      case "home":
        return <HomeView setCurrentTab={handleTabChange} setShowThemePopup={setShowThemePopup} />;
      case "about":
        return <AboutView />;
      case "products":
        return <ProductsView setCurrentTab={handleTabChange} />;
      case "build":
        return <BuildView setCurrentTab={handleTabChange} />;
      case "umaiza":
        return <UmaizaLandingView setCurrentTab={handleTabChange} user={user} handleLogin={handleLogin} isLoggingIn={isLoggingIn} />;
      case "advisor":
        return <AdvisorView setCurrentTab={handleTabChange} user={user} isDark={isDarkTheme} setIsDark={setTheme} />;
      case "contact":
        return <ContactView />;
      case "admin":
        return <AdminView />;
      default:
        return <HomeView setCurrentTab={handleTabChange} setShowThemePopup={setShowThemePopup} />;
    }
  };

  const setTheme = (isDark: boolean) => {
    setIsDarkTheme(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark-theme");
      localStorage.setItem("app-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark-theme");
      localStorage.setItem("app-theme", "light");
    }
    setShowThemePopup(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream text-purple-deep font-sans antialiased selection:bg-gold/30 relative transition-colors duration-500">
      
      {/* Theme Selection Popup */}
      <ThemePopup show={showThemePopup && currentTab === "home"} onSelectTheme={setTheme} />

      {/* Absolute Header Overlay */}
      {currentTab !== "advisor" && <Header currentTab={currentTab} setCurrentTab={handleTabChange} isDarkTheme={isDarkTheme} setTheme={setTheme} />}

      {/* Main Content Area */}
      <main className="flex-grow">
        {renderView()}
      </main>

      {/* Persistent Floating Advisor Widget */}
      {currentTab !== "advisor" && <FloatingAdvisor setCurrentTab={handleTabChange} />}

      {/* Consistent Luxury Footer */}
      {currentTab !== "advisor" && <Footer setCurrentTab={handleTabChange} />}
    </div>
  );
}
