# Progress

Cập nhật lần cuối: **2026-08-17**

## Tổng quan

| Milestone | Trạng thái |
|---|---|
| Base layout responsive | Hoàn thành |
| 01 — Authentication và protected routes | Đang thực hiện |
| 02 — Quản lý board | Chưa bắt đầu |
| 03 — Kanban list và card | Chưa bắt đầu |
| 04 — Chi tiết card | Chưa bắt đầu |
| 05 — Tìm kiếm, lọc và thông báo | Chưa bắt đầu |
| 06 — Tối ưu và kiểm thử | Chưa bắt đầu |

## Đã hoàn thành

- [x] Khởi tạo React + TypeScript + Vite.
- [x] Layout desktop/mobile gồm header, sidebar, board, column và task card.
- [x] Redux store với `auth` reducer.
- [x] Typed hooks `useAppDispatch` và `useAppSelector`.
- [x] `AuthState` và lifecycle `login.pending/fulfilled/rejected`.
- [x] Form Login cơ bản và loading state.
- [x] Route `/` và `/login` cơ bản.
- [x] Module mock `loginApi`.

## Việc tiếp theo của Milestone 01

- [ ] `loginApi` kiểm tra credentials, delay và reject khi sai.
- [ ] Bổ sung validation email/password và accessibility theo requirement.
- [ ] Thêm selectors và custom hook `useAuth`.
- [ ] Thêm `restoreSession` và persistence bằng `trello.auth.v1`.
- [ ] Thêm logout và lấy user thật từ Redux trong `AppShell`.
- [ ] Tạo `/boards`, `/boards/demo`, trang 404 và protected/guest routes.
- [ ] Giữ lại URL ban đầu để redirect sau login.
- [ ] Thêm runnable reducer test tối thiểu.
- [ ] Chạy `npm run build` và hoàn tất checklist nghiệm thu.

## Ghi chú bàn giao

- Dữ liệu Kanban vẫn là dữ liệu mẫu trong `App.tsx`; đúng phạm vi milestone này.
- `authApi.ts` hiện trả token mẫu cho mọi credentials và chưa mô phỏng lỗi.
- Chưa review milestone 01 vì các tiêu chí nghiệm thu chưa hoàn tất.
