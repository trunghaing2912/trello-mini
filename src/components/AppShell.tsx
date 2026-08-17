import type { ReactNode } from "react";
import { useAppDispatch } from "../redux/hook";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

type AppShellProps = {
  children: ReactNode;
};

const iconButtonClasses =
  "grid size-[38px] shrink-0 cursor-pointer place-items-center rounded-full border-0 bg-transparent text-[#44546f] hover:bg-[#eef0f6] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[rgba(99,91,255,0.35)]";

const navButtonClasses =
  "flex w-full cursor-pointer items-center gap-3 rounded-[9px] border-0 bg-transparent px-3 py-2.5 text-left text-[#44546f] hover:bg-[#eef0f6]";

export function AppShell({ children }: AppShellProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-[#172b4d]">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-6 border-b border-[#e5e8ef] bg-[rgba(255,255,255,0.92)] px-6 backdrop-blur-xl max-[800px]:gap-3 max-[800px]:px-3.5">
        <div className="flex min-w-52 items-center gap-2.5 text-lg font-extrabold max-[800px]:min-w-0">
          <span className="grid size-8 place-items-center rounded-[9px] bg-[#635bff] text-white">
            T
          </span>
          <span className="max-[800px]:hidden">Trello Mini</span>
        </div>

        <label className="relative w-[min(420px,42vw)] max-[800px]:hidden">
          <span
            className="absolute top-1/2 left-3.5 -translate-y-1/2 text-[#6b778c]"
            aria-hidden="true"
          >
            ⌕
          </span>
          <input
            className="w-full rounded-[10px] border border-[#dfe2e8] bg-[#f7f8fa] py-2.5 pr-3.5 pl-10 outline-none focus:border-[#635bff] focus:shadow-[0_0_0_3px_rgba(99,91,255,0.12)]"
            type="search"
            placeholder="Tìm kiếm công việc..."
            aria-label="Tìm kiếm công việc"
          />
        </label>

        <div className="ml-auto flex items-center gap-2.5">
          <button
            className={iconButtonClasses}
            type="button"
            aria-label="Tạo mới"
          >
            ＋
          </button>
          <button
            className={iconButtonClasses}
            type="button"
            aria-label="Thông báo"
          >
            ♧
          </button>

          <details className="group relative">
            <summary
              className="grid size-[38px] shrink-0 cursor-pointer list-none place-items-center rounded-full border-2 border-white bg-[#dcd9ff] text-xs font-[750] text-[#4037aa] shadow-[0_0_0_1px_#d9dce4] transition hover:-translate-y-px hover:shadow-[0_0_0_3px_rgba(99,91,255,0.20)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[rgba(99,91,255,0.30)] group-open:-translate-y-px group-open:shadow-[0_0_0_3px_rgba(99,91,255,0.20)] [&::-webkit-details-marker]:hidden"
              aria-label="Mở menu tài khoản Hải Nguyễn"
            >
              HN
            </summary>

            <div className="absolute top-[calc(100%+12px)] right-0 z-30 w-[min(290px,calc(100vw-28px))] rounded-[14px] border border-[#e1e4ea] bg-white p-2.5 shadow-[0_18px_48px_rgba(23,43,77,0.20)] before:absolute before:-top-1.5 before:right-3.5 before:size-[11px] before:rotate-45 before:border-t before:border-l before:border-[#e1e4ea] before:bg-white before:content-['']">
              <p className="mx-2 mt-0.5 mb-2.5 text-[10px] font-extrabold tracking-[0.08em] text-[#8993a4] uppercase">
                Tài khoản
              </p>

              <div className="flex items-center gap-[11px] px-2 pt-[7px] pb-2.5">
                <span
                  className="grid size-[42px] shrink-0 place-items-center rounded-full bg-[#dcd9ff] text-xs font-extrabold text-[#4037aa]"
                  aria-hidden="true"
                >
                  HN
                </span>
                <div className="min-w-0">
                  <strong className="mb-[3px] block text-[13px] text-[#263752]">
                    Hải Nguyễn
                  </strong>
                  <span className="block max-w-[190px] overflow-hidden text-[11px] text-ellipsis whitespace-nowrap text-[#7a869a]">
                    hai.nguyen@example.com
                  </span>
                </div>
              </div>

              <div className="mx-1 my-1.5 h-px bg-[#eef0f4]" />

              <button
                className="flex w-full cursor-pointer items-center gap-[11px] rounded-[9px] border-0 bg-transparent p-2.5 text-left text-[#ae2e24] hover:bg-[#ffebe6] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[rgba(201,55,44,0.20)]"
                type="button"
              >
                <span
                  className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#ffebe6] text-[19px] font-extrabold"
                  aria-hidden="true"
                >
                  ↪
                </span>
                <button onClick={handleLogout}>
                  <strong className="block text-[13px]">Đăng xuất</strong>
                  <small className="mt-0.5 block text-[10px] font-medium text-[#7a869a]">
                    Thoát khỏi tài khoản hiện tại
                  </small>
                </button>
              </button>
            </div>
          </details>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-64px)] grid-cols-[240px_minmax(0,1fr)] max-[800px]:block">
        <Sidebar />
        <main className="min-w-0 px-8 pt-7 pb-10 max-[800px]:px-4 max-[800px]:pt-[22px] max-[800px]:pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="border-r border-[#e5e8ef] bg-white px-4 py-6 max-[800px]:hidden">
      <nav aria-label="Điều hướng chính">
        <p className="mx-3 mt-[18px] mb-2 text-[11px] font-extrabold tracking-[0.08em] text-[#8993a4] uppercase">
          Không gian làm việc
        </p>
        <button className={navButtonClasses} type="button">
          <span className="w-5 text-center">⌂</span>Tổng quan
        </button>
        <button
          className={`${navButtonClasses} bg-[#efeeff] font-bold text-[#5147d9] hover:bg-[#efeeff]`}
          type="button"
        >
          <span className="w-5 text-center">▦</span>Bảng công việc
        </button>
        <button className={navButtonClasses} type="button">
          <span className="w-5 text-center">✓</span>Công việc của tôi
        </button>

        <p className="mx-3 mt-[18px] mb-2 text-[11px] font-extrabold tracking-[0.08em] text-[#8993a4] uppercase">
          Bảng gần đây
        </p>
        <button className={navButtonClasses} type="button">
          <span className="w-5 text-center">●</span>Website tuyển dụng
        </button>
        <button className={navButtonClasses} type="button">
          <span className="w-5 text-center">○</span>Marketing Q3
        </button>
      </nav>

      <div className="mt-8 rounded-xl border border-[#e1dfff] bg-[#f8f7ff] p-3.5 text-xs leading-6">
        <strong className="mb-1 block text-[13px]">Mẹo nhỏ</strong>
        Kéo thẻ để thay đổi trạng thái công việc.
      </div>
    </aside>
  );
}
