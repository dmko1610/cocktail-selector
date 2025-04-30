import { Navigate, Route, Routes } from "react-router-dom";

const cocktailCodes = ["margarita", "mojito", "a1", "kir"];

export const AppRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={<Navigate to={`/${cocktailCodes[0]}`} replace />}
    />
  </Routes>
);
