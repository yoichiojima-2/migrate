import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CityProvider } from './context/CityContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import QualityOfLifePage from './pages/QualityOfLifePage';
import CostOfLivingPage from './pages/CostOfLivingPage';
import ComparisonPage from './pages/ComparisonPage';
import CountryRankingsPage from './pages/CountryRankingsPage';
import AboutPage from './pages/AboutPage';
import './App.css';

const App: React.FC = () => {
  return (
    <CityProvider>
      <Router basename="/migrate">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quality-of-life" element={<QualityOfLifePage />} />
            <Route path="/cost-of-living" element={<CostOfLivingPage />} />
            <Route path="/comparison" element={<ComparisonPage />} />
            <Route path="/rankings" element={<CountryRankingsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Layout>
      </Router>
    </CityProvider>
  );
}

export default App;
