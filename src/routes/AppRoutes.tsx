import { Routes, Route, Navigate } from 'react-router-dom';
import Vitrine from '@/pages/public/Vitrine';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Vitrine />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}