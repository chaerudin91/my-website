'use client';

import React, { useState } from 'react';
import LandingPage from './LandingPage';
import LoginModal from './components/LoginModalNew';
import Dashboard from './components/Dashboard';

export default function EksporaApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  return (
    <>
      {/* Show Login Modal when triggered */}
      {showLogin && !isLoggedIn && (
        <LoginModal
          onClose={handleCloseLogin}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* Show Dashboard if logged in, otherwise show Landing Page */}
      {isLoggedIn ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <LandingPage onShowLogin={handleShowLogin} />
      )}
    </>
  );
}
