import { Navigate, Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound';

const cocktailCodes = ['margarita', 'mojito', 'a1', 'kir'];

export const AppRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={<Navigate to={`/${cocktailCodes[0]}`} replace />}
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
