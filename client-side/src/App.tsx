import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import QualityOfLifePage from "./pages/QualityOfLifePage";
import CostOfLivingPage from "./pages/CostOfLivingPage";
import ComparisonPage from "./pages/ComparisonPage";
import CountryRankingsPage from "./pages/CountryRankingsPage";
import AboutPage from "./pages/AboutPage";

const App: React.FC = () => {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Log to monitoring service in production
    console.error("Application Error:", error, errorInfo);
  };

  return (
    <ErrorBoundary onError={handleError}>
      <AppProvider>
          <Router basename="/migrate">
            <Layout>
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route
                    path="/quality-of-life"
                    element={<QualityOfLifePage />}
                  />
                  <Route
                    path="/cost-of-living"
                    element={<CostOfLivingPage />}
                  />
                  <Route path="/comparison" element={<ComparisonPage />} />
                  <Route path="/rankings" element={<CountryRankingsPage />} />
                  <Route path="/about" element={<AboutPage />} />
                </Routes>
              </ErrorBoundary>
            </Layout>
          </Router>
      </AppProvider>
    </ErrorBoundary>
  );
};

export default App;
