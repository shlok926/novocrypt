import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast';
import { ToastHost } from './components/ToastHost';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { ScrollToTop } from './components/ScrollToTop';

// Pages
import { Home } from './pages/Home';
import { Lab } from './pages/Lab';
import { RiskCalculator } from './pages/RiskCalculator';
import { Algorithms } from './pages/Algorithms';
import { Learn } from './pages/Learn';
import { Blog } from './pages/Blog';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { NotFound } from './pages/NotFound';
import QDayTracker from './pages/QDayTracker';
import Playground from './pages/Playground';
import Scanner from './pages/Scanner';
import ThreatFeed from './pages/ThreatFeed';
import MigrationPlanner from './pages/MigrationPlanner';
import ComplianceChecker from './pages/ComplianceChecker';
import Community from './pages/Community';
import QuantumBot from './pages/QuantumBot';

function App() {
  return (
    <ToastProvider>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-slate-950 text-slate-300">
        <Navbar />
        <main className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/algorithms" element={<Algorithms />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/qday-tracker" element={<QDayTracker />} />
            <Route path="/threats" element={<ThreatFeed />} />
            <Route path="/community" element={<Community />} />
            
            {/* Protected Routes (Require Login) */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/lab" element={<ProtectedRoute><Lab /></ProtectedRoute>} />
            <Route path="/risk" element={<ProtectedRoute><RiskCalculator /></ProtectedRoute>} />
            <Route path="/playground" element={<ProtectedRoute><Playground /></ProtectedRoute>} />
            <Route path="/scanner" element={<ProtectedRoute><Scanner /></ProtectedRoute>} />
            <Route path="/migration-planner" element={<ProtectedRoute><MigrationPlanner /></ProtectedRoute>} />
            <Route path="/compliance" element={<ProtectedRoute><ComplianceChecker /></ProtectedRoute>} />
            <Route path="/quantum-bot" element={<ProtectedRoute><QuantumBot /></ProtectedRoute>} />
            
            {/* Fallback */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </main>
        <Footer />
        <ToastHost />
      </div>
    </ToastProvider>
  );
}

export default App;
