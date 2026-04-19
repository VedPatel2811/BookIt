import { Routes, Route, Navigate } from 'react-router-dom';
import { Onboarding } from './pages/Onboarding';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { DashboardLayout } from './layouts/DashboardLayout';
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Public routes only accessible if unauthenticated */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Protected routes only accessible if authenticated */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
