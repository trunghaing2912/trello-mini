import type { ReactNode } from 'react'

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">T</span>
          <span className="brand-name">Trello Mini</span>
        </div>

        <label className="global-search">
          <span aria-hidden="true">⌕</span>
          <input type="search" placeholder="Tìm kiếm công việc..." aria-label="Tìm kiếm công việc" />
        </label>

        <div className="topbar-actions">
          <button className="icon-button" type="button" aria-label="Tạo mới">＋</button>
          <button className="icon-button" type="button" aria-label="Thông báo">♧</button>
          <span className="avatar" aria-label="Tài khoản Hải Nguyễn">HN</span>
        </div>
      </header>

      <div className="workspace">
        <Sidebar />
        <main className="main-content">{children}</main>
      </div>
    </div>
  )
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav aria-label="Điều hướng chính">
        <p className="nav-label">Không gian làm việc</p>
        <button className="nav-item" type="button"><span className="nav-icon">⌂</span>Tổng quan</button>
        <button className="nav-item active" type="button"><span className="nav-icon">▦</span>Bảng công việc</button>
        <button className="nav-item" type="button"><span className="nav-icon">✓</span>Công việc của tôi</button>

        <p className="nav-label">Bảng gần đây</p>
        <button className="nav-item" type="button"><span className="nav-icon">●</span>Website tuyển dụng</button>
        <button className="nav-item" type="button"><span className="nav-icon">○</span>Marketing Q3</button>
      </nav>

      <div className="sidebar-footer">
        <strong>Mẹo nhỏ</strong>
        Kéo thẻ để thay đổi trạng thái công việc.
      </div>
    </aside>
  )
}
