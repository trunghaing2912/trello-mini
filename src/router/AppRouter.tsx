import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import App from "../App";
import BoardsPage from "../components/BoardsPage";
import Login from "../components/Login";
import NotFound from "../components/NotFound";
import TaskDetail from "../components/TaskDetail";
import { restoreSession } from "../redux/authSlice";
import { getStoredAuth } from "../redux/authStorage";
import { useAppDispatch, useAppSelector } from "../redux/hook";

function ProtectedRoute() {
  const isAuthenticated = useAppSelector((state) =>
    Boolean(state.auth.user && state.auth.token),
  );
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

function GuestRoute() {
  const isAuthenticated = useAppSelector((state) =>
    Boolean(state.auth.user && state.auth.token),
  );

  return isAuthenticated ? <Navigate to="/boards" replace /> : <Outlet />;
}

function RootRedirect() {
  const isAuthenticated = useAppSelector((state) =>
    Boolean(state.auth.user && state.auth.token),
  );

  return (
    <Navigate to={isAuthenticated ? "/boards" : "/login"} replace />
  );
}

export default function AppRouter() {
  const dispatch = useAppDispatch();
  const [isSessionReady, setIsSessionReady] = useState(false);
  const isAuthenticated = useAppSelector((state) =>
    Boolean(state.auth.user && state.auth.token),
  );

  useEffect(() => {
    const savedAuth = getStoredAuth();

    if (savedAuth) {
      dispatch(restoreSession(savedAuth));
    }

    setIsSessionReady(true);
  }, [dispatch]);

  if (!isSessionReady) {
    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />

        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/boards" element={<BoardsPage />} />
          <Route path="/boards/demo" element={<App />} />
          <Route
            path="/boards/demo/:taskId"
            element={
              <>
                <App />
                <TaskDetail />
              </>
            }
          />
        </Route>

        <Route
          path="*"
          element={
            <NotFound homePath={isAuthenticated ? "/boards" : "/login"} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
