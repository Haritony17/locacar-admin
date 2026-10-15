import { Routes, Route, Navigate } from 'react-router-dom';
import Vitrine from '@/pages/public/Vitrine';
import OffreCustom from '@/pages/public/OffreCustom';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Vitrine />} />
      <Route path="/sur-mesure" element={<OffreCustom />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}