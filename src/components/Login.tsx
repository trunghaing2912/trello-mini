import { useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { login } from "../redux/authSlice";
import {
  useLocation,
  useNavigate,
  type Location,
} from "react-router-dom";

type LoginLocationState = {
  from?: Pick<Location, "pathname" | "search" | "hash">;
};

const Login = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { user, error, status } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const routeState = location.state as LoginLocationState | null;
  const requestedLocation = routeState?.from;

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
      const destination = requestedLocation
        ? `${requestedLocation.pathname}${requestedLocation.search}${requestedLocation.hash}`
        : "/boards";

      navigate(destination, { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top_left,rgba(99,91,255,0.18),transparent_34%)] bg-[#f7f8fc] p-6">
      <section
        className="w-full max-w-[420px] rounded-[18px] border border-[#e5e8ef] bg-white p-10 shadow-[0_20px_50px_rgba(23,43,77,0.12)] max-[480px]:px-[22px] max-[480px]:py-7"
        aria-labelledby="login-title"
      >
        <div className="mb-6 grid size-11 place-items-center rounded-xl bg-[#635bff] text-[22px] font-extrabold text-white" aria-hidden="true">
          T
        </div>
        <h1 className="m-0 text-[30px] font-bold" id="login-title">Đăng nhập</h1>
        <p className="mt-2 mb-7 text-[#6b778c]">Chào mừng bạn trở lại Trello Mini</p>

        <form className="grid gap-[18px]" onSubmit={handleLogin}>
          <div className="grid gap-2">
            <label className="text-sm font-bold" htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              required
              className="w-full rounded-[10px] border border-[#dfe2e8] bg-[#fbfcfe] px-3.5 py-3 text-[#172b4d] outline-none focus:border-[#635bff] focus:shadow-[0_0_0_3px_rgba(99,91,255,0.12)]"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-bold" htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Nhập mật khẩu"
              required
              className="w-full rounded-[10px] border border-[#dfe2e8] bg-[#fbfcfe] px-3.5 py-3 text-[#172b4d] outline-none focus:border-[#635bff] focus:shadow-[0_0_0_3px_rgba(99,91,255,0.12)]"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button
            className="mt-1.5 cursor-pointer rounded-[10px] border-0 bg-[#635bff] px-4 py-3 font-[750] text-white hover:not-disabled:bg-[#5147d9] disabled:cursor-wait disabled:opacity-65 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[rgba(99,91,255,0.35)]"
            type="submit"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        {error && (
          <p className="mt-[18px] text-sm text-[#c9372c]" role="alert">
            {error}
          </p>
        )}

        {user && (
          <p className="mt-[18px] text-sm text-[#21875a]" role="status">
            Chào mừng {user.name}
          </p>
        )}
      </section>
    </main>
  );
};

export default Login;
