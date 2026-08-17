import { useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { user, error, status } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await dispatch(
        login({
          email,
          password,
        }),
      ).unwrap();

      console.log("Login success:", result);
      localStorage.setItem("auth", JSON.stringify(result));
      navigate("/board");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <div className="login-brand" aria-hidden="true">
          T
        </div>
        <h1 id="login-title">Đăng nhập</h1>
        <p className="login-subtitle">Chào mừng bạn trở lại Trello Mini</p>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-field">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Nhập mật khẩu"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button
            className="login-submit"
            type="submit"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        {error && (
          <p className="login-message error" role="alert">
            {error}
          </p>
        )}

        {user && (
          <p className="login-message" role="status">
            Chào mừng {user.name}
          </p>
        )}
      </section>
    </main>
  );
};

export default Login;
