import { Routes, Route, Navigate } from 'react-router-dom';
import { Onboarding } from './pages/Onboarding';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { Facilities } from './pages/Facilities';
import { FacilityBooking } from './pages/FacilityBooking';
import { Maintenance } from './pages/Maintenance';
import { Complaints } from './pages/Complaints';
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
        <Route path="/facilities" element={<DashboardLayout />}>
          <Route index element={<Facilities />} />
          <Route path=":id" element={<FacilityBooking />} />
        </Route>
        <Route path="/maintenance" element={<DashboardLayout />}>
          <Route index element={<Maintenance />} />
        </Route>
        <Route path="/complaints" element={<DashboardLayout />}>
          <Route index element={<Complaints />} />
        </Route>
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
