import { Navigate, Route, Routes } from 'react-router-dom';
import NotFound from '@/pages/NotFoundPage/NotFound';
import CocktailPage from '@/pages/CocktailPage/CocktailPage';
import { VALID_CODES } from '@/constants';

export const AppRoutes = () => (
  <main className="content">
    <Routes>
      <Route
        path="/"
        element={<Navigate to={`/${VALID_CODES[0]}`} replace />}
      />
      <Route path="/:code" element={<CocktailPage />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  </main>
);
