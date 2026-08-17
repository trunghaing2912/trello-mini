import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import Login from "../components/Login";
import NotFound from "../components/NotFound";
import { useAppSelector } from "../redux/hook";
import TaskDetail from "../components/TaskDetail";

export default function AppRouter() {
  const { user, token } = useAppSelector((state) => state.auth);
  const isLoggedIn = !!user && !!token;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/board" element={isLoggedIn ? <App /> : <Login />} />
        <Route
          path="/board/:taskId"
          element={
            isLoggedIn ? (
              <>
                <App />
                <TaskDetail />
              </>
            ) : (
              <Login />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={<NotFound homePath={isLoggedIn ? "/board" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
