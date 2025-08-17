import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy load entire page components
export const DashboardPage = lazy(() => import("../pages/Dashboard"));
export const AssetsPage = lazy(() => import("../pages/Assets"));

const LazyRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={
        <Suspense fallback={<div>Loading Dashboard...</div>}>
          <DashboardPage />
        </Suspense>
      }
    />
    <Route
      path="/assets"
      element={
        <Suspense fallback={<div>Loading Assets...</div>}>
          <AssetsPage />
        </Suspense>
      }
    />
  </Routes>
);

export default LazyRoutes;
