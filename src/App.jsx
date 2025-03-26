import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import UserDetailScreen from './screens/UserDetailsScreen';
import UserWeeklySummaries from './screens/UserWeeklySummaries';
import ManagerDashboardScreen from './screens/ManagerDashbaordScreen';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState('');

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('userToken');
      const userRole = localStorage.getItem('role');
      setRole(userRole);
      setIsLoggedIn(!!token);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          role === 'manager' ? (
            <>
              <Route
                path="/dashboard"
                element={
                  <ManagerDashboardScreen
                    setIsLoggedIn={setIsLoggedIn}
                  />
                }
              />
              <Route
                path="/user/:userId"
                element={
                  <UserDetailScreen
                    setIsLoggedIn={setIsLoggedIn}
                  />
                }
              />
              <Route
                path="/weekly-summaries/:weekId"
                element={
                  <UserWeeklySummaries
                    setIsLoggedIn={setIsLoggedIn}
                  />
                }
              />
              <Route
                path="*"
                element={<Navigate to="/dashboard" replace />}
              />
            </>
          ) : (
            <Navigate to="/login" replace />
          )
        ) : (
          <>
            <Route
              path="/login"
              element={
                <LoginScreen
                  setIsLoggedIn={setIsLoggedIn}
                  setRole={setRole}
                />
              }
            />
            <Route
              path="*"
              element={<Navigate to="/login" replace />}
            />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;