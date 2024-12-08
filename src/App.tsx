import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AuthLayout from './components/AuthLayout';
import AuthForm from './components/AuthForm';
import Dashboard from './pages/Dashboard';
import OnboardForm from './pages/OnboardForm';
import ProducersList from './pages/ProducersList';
import ConsumersList from './pages/ConsumersList';
import DomainManagement from './pages/DomainManagement';
import Roadmap from './pages/Roadmap';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AuthLayout>
                <AuthForm isLogin={true} onToggle={() => {}} />
              </AuthLayout>
            )
          }
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/" replace />}
        />
        <Route
          path="/onboard"
          element={user ? <OnboardForm /> : <Navigate to="/" replace />}
        />
        <Route
          path="/producers"
          element={user ? <ProducersList /> : <Navigate to="/" replace />}
        />
        <Route
          path="/consumers"
          element={user ? <ConsumersList /> : <Navigate to="/" replace />}
        />
        <Route
          path="/domain-management"
          element={user ? <DomainManagement /> : <Navigate to="/" replace />}
        />
        <Route
          path="/roadmap"
          element={user ? <Roadmap /> : <Navigate to="/" replace />}
        />
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;