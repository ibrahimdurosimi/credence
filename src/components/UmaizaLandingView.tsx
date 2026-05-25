import React from "react";
import { Sparkles, Calculator, BookOpen, Clock, ArrowRight } from "lucide-react";
import { User } from "firebase/auth";

interface UmaizaLandingViewProps {
  setCurrentTab: (tab: string) => void;
  user?: User | null;
  handleLogin?: () => Promise<void>;
  isLoggingIn?: boolean;
}

export default function UmaizaLandingView({ setCurrentTab, user, handleLogin, isLoggingIn }: UmaizaLandingViewProps) {
  return (
    <div className="bg-cream text-purple-deep min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        
        <div className="flex flex-col items-center text-center mb-16 pt-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-deep/10 bg-white px-3 py-1 mb-10 text-xs font-medium text-purple-deep/70 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-gold"></span>
            Umaiza — AI-powered interest-free financial advisor
          </div>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-purple-deep mb-6 max-w-4xl leading-tight">
            Meet your personal <span className="text-gold italic font-serif">ethical finance guide.</span>
          </h1>

          <p className="text-purple-deep/70 max-w-2xl text-lg md:text-xl leading-relaxed mb-10">
            Not a chatbot. Not a form. A genuinely intelligent advisor that understands your needs, checks your eligibility, and connects you to the right ethical financing — in plain language, in minutes.
          </p>

          {user ? (
            <button
              onClick={() => setCurrentTab("advisor")}
              className="inline-flex items-center gap-2 rounded-xl bg-purple-deep text-cream px-8 py-3.5 text-sm font-bold shadow-md hover:bg-purple-deep/90 hover:scale-105 transition active:scale-95"
            >
              Continue to Chat <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={async () => {
                if (handleLogin) {
                  await handleLogin();
                  setCurrentTab("advisor");
                } else {
                  setCurrentTab("advisor");
                }
              }}
              disabled={isLoggingIn}
              className="inline-flex items-center gap-3 rounded-xl bg-white border border-purple-deep/10 text-purple-deep px-8 py-3.5 text-sm font-bold shadow-md hover:bg-cream-mid hover:scale-105 transition active:scale-95 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
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
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="rounded-2xl border border-purple-deep/10 bg-white p-8 hover:shadow-lg hover:border-gold/30 transition duration-300 flex flex-col h-full">
            <div className="mb-6 mb-8">
              <Sparkles className="h-6 w-6 text-gold" />
            </div>
            <h3 className="font-serif text-lg font-bold text-purple-deep mb-3">Natural Language</h3>
            <p className="text-purple-deep/70 text-sm leading-relaxed">
              Understands your need in natural language
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-purple-deep/10 bg-white p-8 hover:shadow-lg hover:border-gold/30 transition duration-300 flex flex-col h-full">
            <div className="mb-6 mb-8">
              <Calculator className="h-6 w-6 text-gold" />
            </div>
            <h3 className="font-serif text-lg font-bold text-purple-deep mb-3">Eligibility Check</h3>
            <p className="text-purple-deep/70 text-sm leading-relaxed">
              Checks eligibility across all Credence products
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-purple-deep/10 bg-white p-8 hover:shadow-lg hover:border-gold/30 transition duration-300 flex flex-col h-full">
            <div className="mb-6 mb-8">
              <BookOpen className="h-6 w-6 text-gold" />
            </div>
            <h3 className="font-serif text-lg font-bold text-purple-deep mb-3">Clear Explanations</h3>
            <p className="text-purple-deep/70 text-sm leading-relaxed">
              Explains how ethical financing actually works
            </p>
          </div>

          {/* Card 4 */}
          <div className="rounded-2xl border border-purple-deep/10 bg-white p-8 hover:shadow-lg hover:border-gold/30 transition duration-300 flex flex-col h-full">
            <div className="mb-6 mb-8">
              <Clock className="h-6 w-6 text-gold" />
            </div>
            <h3 className="font-serif text-lg font-bold text-purple-deep mb-3">Available 24/7</h3>
            <p className="text-purple-deep/70 text-sm leading-relaxed">
              Available 24/7 — no appointment needed
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
