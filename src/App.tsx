import React, { useState } from 'react';
import Layout from './components/layout/Layout';
import DashboardPage from './components/dashboard/DashboardPage';
import CoursesPage from './components/courses/CoursesPage';
import ResourcesPage from './components/resources/ResourcesPage';
import ExercisesPage from './components/exercises/ExercisesPage';
import ProgressPage from './components/progress/ProgressPage';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import { setCurrentUser } from './data/mockData';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleLogin = (userId: string) => {
    setCurrentUser(userId);
    setIsLoggedIn(true);
  };

  const switchToRegister = () => {
    setIsRegistering(true);
  };

  const switchToLogin = () => {
    setIsRegistering(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardPage />;
      case 'courses':
        return <CoursesPage />;
      case 'resources':
        return <ResourcesPage />;
      case 'exercises':
        return <ExercisesPage />;
      case 'progress':
        return <ProgressPage />;
      default:
        return <DashboardPage />;
    }
  };

  if (!isLoggedIn) {
    return isRegistering ? (
      <RegisterPage switchToLogin={switchToLogin} />
    ) : (
      <LoginPage onLogin={handleLogin} switchToRegister={switchToRegister} />
    );
  }

  return (
    <Layout>
      {renderContent()}
    </Layout>
  );
}

export default App;