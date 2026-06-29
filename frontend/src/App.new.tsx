import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast';
import { ToastHost } from './components/ToastHost';

// Pages
import { Home } from './pages/Home';
import { Lab } from './pages/Lab';
import { RiskCalculator } from './pages/RiskCalculator';
import { Algorithms } from './pages/Algorithms';
import { Learn } from './pages/Learn';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <ToastProvider>
      <Router>
        <div className="min-h-screen bg-slate-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lab" element={<Lab />} />
            <Route path="/risk" element={<RiskCalculator />} />
            <Route path="/algorithms" element={<Algorithms />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
          <ToastHost />
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;
