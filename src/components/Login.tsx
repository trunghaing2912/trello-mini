import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { login } from "../redux/authSlice";
import { useLocation, useNavigate, type Location } from "react-router-dom";
import { saveAuth } from "../redux/authStorage";

type LoginLocationState = {
  from?: Pick<Location, "pathname" | "search" | "hash">;
};

type FieldErrors = {
  email?: string;
  password?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const emailId = useId();
  const passwordId = useId();
  const emailErrorId = `${emailId}-error`;
  const passwordErrorId = `${passwordId}-error`;
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { error, status } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const routeState = location.state as LoginLocationState | null;
  const requestedLocation = routeState?.from;

  useEffect(() => {
    if (status === "failed") {
      emailRef.current?.focus();
    }
  }, [status]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim();
    const nextErrors: FieldErrors = {};

    if (!normalizedEmail) {
      nextErrors.email = "Email là bắt buộc";
    } else if (!EMAIL_REGEX.test(normalizedEmail)) {
      nextErrors.email = "Email không đúng định dạng";
    }

    if (!password) {
      nextErrors.password = "Password là bắt buộc";
    } else if (password.length < 6) {
      nextErrors.password = "Password phải có ít nhất 6 ký tự";
    }

    setFieldErrors(nextErrors);

    if (nextErrors.email) {
      emailRef.current?.focus();
      return;
    }

    if (nextErrors.password) {
      passwordRef.current?.focus();
      return;
    }

    try {
      const result = await dispatch(
        login({
          email: normalizedEmail,
          password,
        }),
      ).unwrap();

      saveAuth(result);
      const destination = requestedLocation
        ? `${requestedLocation.pathname}${requestedLocation.search}${requestedLocation.hash}`
        : "/boards";

      navigate(destination, { replace: true });
    } catch {
      return;
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top_left,rgba(99,91,255,0.18),transparent_34%)] bg-[#f7f8fc] p-6">
      <section
        className="w-full max-w-[420px] rounded-[18px] border border-[#e5e8ef] bg-white p-10 shadow-[0_20px_50px_rgba(23,43,77,0.12)] max-[480px]:px-[22px] max-[480px]:py-7"
        aria-labelledby="login-title"
      >
        <div
          className="mb-6 grid size-11 place-items-center rounded-xl bg-[#635bff] text-[22px] font-extrabold text-white"
          aria-hidden="true"
        >
          T
        </div>
        <h1 className="m-0 text-[30px] font-bold" id="login-title">
          Đăng nhập
        </h1>
        <p className="mt-2 mb-7 text-[#6b778c]">
          Chào mừng bạn trở lại Trello Mini
        </p>

        <aside
          className="mb-6 rounded-[10px] bg-[#f1f2ff] p-3 text-sm text-[#44546f]"
          aria-label="Tài khoản dùng thử"
        >
          <strong className="block text-[#263752]">Tài khoản dùng thử</strong>
          <span className="mt-1 block">
            Email: <code>demo@trello.local</code>
          </span>
          <span className="block">
            Password: <code>123456</code>
          </span>
        </aside>

        <form
          className="grid gap-[18px]"
          aria-busy={status === "loading"}
          noValidate
          onSubmit={handleLogin}
        >
          <div className="grid gap-2">
            <label className="text-sm font-bold" htmlFor={emailId}>
              Email
            </label>

            <input
              ref={emailRef}
              id={emailId}
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              required
              className={`w-full rounded-[10px] border bg-[#fbfcfe] px-3.5 py-3 text-[#172b4d] outline-none focus:border-[#635bff] focus:shadow-[0_0_0_3px_rgba(99,91,255,0.12)] ${fieldErrors.email ? "border-[#c9372c]" : "border-[#dfe2e8]"}`}
              value={email}
              disabled={status === "loading"}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? emailErrorId : undefined}
              onChange={(event) => setEmail(event.target.value)}
            />

            {fieldErrors.email ? (
              <p id={emailErrorId} className="m-0 text-sm text-[#c9372c]" role="alert">
                {fieldErrors.email}
              </p>
            ) : null}
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-bold" htmlFor={passwordId}>
              Password
            </label>

            <input
              ref={passwordRef}
              id={passwordId}
              type="password"
              autoComplete="current-password"
              placeholder="Nhập mật khẩu"
              required
              className={`w-full rounded-[10px] border bg-[#fbfcfe] px-3.5 py-3 text-[#172b4d] outline-none focus:border-[#635bff] focus:shadow-[0_0_0_3px_rgba(99,91,255,0.12)] ${fieldErrors.password ? "border-[#c9372c]" : "border-[#dfe2e8]"}`}
              value={password}
              minLength={6}
              disabled={status === "loading"}
              aria-invalid={Boolean(fieldErrors.password)}
              aria-describedby={
                fieldErrors.password ? passwordErrorId : undefined
              }
              onChange={(event) => setPassword(event.target.value)}
            />

            {fieldErrors.password ? (
              <p
                id={passwordErrorId}
                className="m-0 text-sm text-[#c9372c]"
                role="alert"
              >
                {fieldErrors.password}
              </p>
            ) : null}
          </div>

          {error ? (
            <p className="m-0 text-sm text-[#c9372c]" role="alert">
              {error}
            </p>
          ) : null}

          <button
            className="mt-1.5 cursor-pointer rounded-[10px] border-0 bg-[#635bff] px-4 py-3 font-[750] text-white hover:not-disabled:bg-[#5147d9] disabled:cursor-wait disabled:opacity-65 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[rgba(99,91,255,0.35)]"
            type="submit"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
