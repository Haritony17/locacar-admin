import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import AdminLayout from '@/layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';
import ListeClients from '@/pages/clients/ListeClients';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/clients" element={<ListeClients />} />
          <Route path="/" element={<Navigate to="/clients" replace />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}