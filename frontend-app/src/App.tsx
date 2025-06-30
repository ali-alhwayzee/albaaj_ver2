// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterCard from './pages/RegisterCard';
import Dashboard from './pages/Dashboard';
import NewVehicle from './pages/NewVehicle';
import EditVehicle from './pages/EditVehicle';
import ReportsPage from './pages/ReportsPage';


import VehicleList from './pages/VehicleList';
import VehicleDetails from './pages/VehicleDetails';
import LogoutPage from './pages/LogoutPage';

import PrivateRoute from './components/auth/PrivateRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterCard />} />

      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/vehicles" element={<PrivateRoute><VehicleList /></PrivateRoute>} />
      <Route path="/vehicles/new" element={<PrivateRoute><NewVehicle /></PrivateRoute>} />
      <Route path="/vehicles/edit/:id" element={<PrivateRoute><EditVehicle /></PrivateRoute>} />
      <Route path="/vehicles/:id" element={<PrivateRoute><VehicleDetails /></PrivateRoute>} />
      <Route path="/reports" element={<PrivateRoute><ReportsPage /></PrivateRoute>} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/logout" element={<LogoutPage />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
