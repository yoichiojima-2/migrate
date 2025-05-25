/**
 * Header component
 */
import React from 'react';

interface HeaderProps {
  title: string;
  subtitle: string;
}

/**
 * Header component for the application
 * @param props - Component props
 * @returns React component
 */
const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-blue-800 via-purple-700 to-pink-600 text-white py-12 px-8 rounded-2xl shadow-2xl">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10 z-0"></div>
      <div 
        className="absolute top-0 left-0 w-full h-full" 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          backgroundSize: '180px 180px'
        }}
        aria-hidden="true"
      ></div>
      
      <div className="relative z-10">
        <h1 className="text-6xl font-extrabold text-center tracking-tight leading-tight text-shadow">
          {title}
        </h1>
        <p className="text-center mt-6 text-2xl font-light max-w-3xl mx-auto">
          {subtitle}
        </p>
      </div>
      
      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white opacity-10 rounded-full" aria-hidden="true"></div>
      <div className="absolute -top-6 -left-6 w-24 h-24 bg-white opacity-10 rounded-full" aria-hidden="true"></div>
    </header>
  );
};

export default Header;
