import { Link } from "react-router-dom";
import { AppShell } from "./AppShell";

export default function BoardsPage() {
  return (
    <AppShell>
      <section aria-labelledby="boards-title">
        <p className="text-sm text-[#7a869a]">Không gian làm việc</p>
        <h1 className="mt-1 text-3xl font-bold" id="boards-title">
          Các bảng của bạn
        </h1>

        <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
          <Link
            className="rounded-xl bg-[#635bff] p-5 text-white no-underline shadow-lg transition hover:-translate-y-1 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[rgba(99,91,255,0.35)]"
            to="/boards/demo"
          >
            <strong className="block text-lg">Website tuyển dụng</strong>
            <span className="mt-2 block text-sm text-white/75">
              Mở bảng Kanban
            </span>
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
