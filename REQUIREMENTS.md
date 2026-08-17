# Requirements

## Mục tiêu toàn dự án

Xây dựng ứng dụng quản lý công việc dạng Kanban để luyện:

- React hooks và custom hooks.
- Redux Toolkit, selector và middleware.
- RTK Query cho dữ liệu từ API.
- Phân biệt local state, global client state và server state.
- Tối ưu render dựa trên đo lường.

## Lộ trình

1. Authentication và protected routes.
2. Quản lý board.
3. Kanban list và card.
4. Chi tiết card, checklist và bình luận.
5. Tìm kiếm, bộ lọc và thông báo.
6. Tối ưu và kiểm thử.

---

# Milestone 01 — Authentication và Protected Routes

## Phạm vi

Milestone này chỉ triển khai đăng nhập giả lập, lưu phiên và bảo vệ route. Chưa làm board CRUD, RTK Query hoặc kéo thả.

Dependency được phép dùng: `@reduxjs/toolkit`, `react-redux` và `react-router-dom`.

Không thêm form library, validation library, authentication SDK hoặc backend.

## Luồng đăng nhập

```mermaid
flowchart TD
    A["Mở ứng dụng"] --> B{"Có session hợp lệ?"}
    B -- "Không" --> C["/login"]
    B -- "Có" --> D["/boards"]
    C --> E["Nhập email và password"]
    E --> F{"Form hợp lệ?"}
    F -- "Không" --> G["Hiển thị lỗi field"]
    F -- "Có" --> H["dispatch login(credentials)"]
    H --> I["status = loading"]
    I --> J{"Credentials đúng?"}
    J -- "Không" --> K["status = failed"]
    K --> C
    J -- "Có" --> L["Lưu user và token"]
    L --> M["Lưu localStorage"]
    M --> D
    D --> N["Logout"]
    N --> O["Xóa Redux session và localStorage"]
    O --> C
```

## Tài khoản demo

```ts
const demoUser = {
  id: 'user-1',
  name: 'Hải Nguyễn',
  email: 'demo@trello.local',
  password: '123456',
}
```

Password chỉ dùng trong hàm mô phỏng đăng nhập, không lưu vào Redux hoặc `localStorage`.

## Routes

| Route | Quyền truy cập | Kết quả |
|---|---|---|
| `/` | Tất cả | Redirect theo trạng thái đăng nhập |
| `/login` | Chưa đăng nhập | Form đăng nhập |
| `/boards` | Đã đăng nhập | Danh sách board tĩnh |
| `/boards/demo` | Đã đăng nhập | Kanban hiện tại |
| `*` | Tất cả | Trang 404 |

Quy tắc:

- Chưa đăng nhập vào route riêng tư phải chuyển tới `/login`.
- Đã đăng nhập vào `/login` phải chuyển tới `/boards`.
- Sau đăng nhập, quay về URL người dùng đã yêu cầu trước đó.
- Refresh `/boards/demo` không mất phiên đăng nhập.
- Dùng `<Navigate>` cho redirect biểu diễn được bằng JSX; không dùng `window.location.href`.

## Redux state

```ts
type AuthUser = {
  id: string
  name: string
  email: string
}

type AuthState = {
  user: AuthUser | null
  token: string | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}
```

Actions bắt buộc: `login.pending`, `login.fulfilled`, `login.rejected`, `logout` và `restoreSession`.

Selectors bắt buộc: `selectCurrentUser`, `selectAuthStatus`, `selectAuthError` và `selectIsAuthenticated`.

`selectIsAuthenticated` phải suy ra từ `user` và `token`; không lưu thêm `isAuthenticated` trong state.

## Async login

`createAsyncThunk` nhận `{ email, password }` và phải:

1. Giả lập request trong 500–800 ms.
2. So sánh credentials với tài khoản demo.
3. Credentials đúng trả về user không có password và token `demo-token`.
4. Credentials sai reject với `Email hoặc mật khẩu không chính xác`.
5. Pending đặt `status = loading` và xoá lỗi cũ.
6. Fulfilled lưu user/token và đặt `status = succeeded`.
7. Rejected xoá session, lưu lỗi và đặt `status = failed`.

```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Loading: login.pending
    Loading --> Succeeded: login.fulfilled
    Loading --> Failed: login.rejected
    Failed --> Loading: gửi lại form
    Succeeded --> Idle: logout
    Idle --> Succeeded: restoreSession
```

## Persistence

Dùng key `trello.auth.v1` và chỉ lưu `{ user, token }`.

- Login thành công lưu session.
- Logout xoá session.
- Khởi động app đọc session và dispatch `restoreSession`.
- JSON hỏng hoặc thiếu `user/token` phải bị xoá mà không làm app crash.
- Không lưu password hoặc toàn bộ Redux store.
- Không dùng Redux Persist trong milestone này.

## Login page

Form gồm email, password, nút đăng nhập và thông tin tài khoản demo.

Validation:

- Email bắt buộc và đúng định dạng cơ bản.
- Password bắt buộc, tối thiểu 6 ký tự.
- Lỗi hiển thị dưới field tương ứng.
- Form không hợp lệ không được dispatch thunk.
- Khi loading, disable input và submit; nút hiển thị `Đang đăng nhập...`.

Accessibility:

- Mỗi input có label.
- Dùng `useId` nối label, input và error message.
- Input lỗi có `aria-invalid` và `aria-describedby`.
- Lỗi đăng nhập có `role="alert"`.

## Hooks bắt buộc

- `useState`: giá trị input và lỗi validation cục bộ.
- `useId`: ID form và error message.
- `useRef`: focus email sau khi đăng nhập thất bại.
- `useEffect`: side effect thật như title hoặc focus; không dùng để tính derived state hay redirect.
- `useAppDispatch` và `useAppSelector`: typed Redux hooks.
- `useAuth`: custom hook dùng tại Login, route guard và AppShell.

Không đưa draft form vào Redux và không thêm `useMemo`/`useCallback` nếu chưa có vấn đề render thực tế.

## Giao diện sau đăng nhập

- Header lấy tên và initials của user từ Redux.
- Có nút logout trong header hoặc sidebar.
- `/boards/demo` tái sử dụng `Board` hiện tại.
- `/boards` chỉ cần một board card tĩnh dẫn tới `/boards/demo`.
- Dữ liệu Kanban mẫu chưa đưa vào Redux.

## Tiêu chí nghiệm thu

- [ ] Login sai hiển thị đúng lỗi.
- [ ] Login đúng chuyển tới `/boards`.
- [ ] Không thể submit nhiều lần khi loading.
- [ ] Route riêng tư bị chặn khi chưa đăng nhập.
- [ ] Login thành công quay lại URL đã yêu cầu.
- [ ] Refresh không làm mất session.
- [ ] Logout xoá Redux state và localStorage.
- [ ] Đã đăng nhập không thể quay lại `/login`.
- [ ] Dữ liệu localStorage hỏng không làm app crash.
- [ ] Password không xuất hiện trong Redux DevTools hoặc localStorage.
- [ ] Không có lỗi TypeScript/console.
- [ ] `npm run build` thành công.

## Kiểm tra tối thiểu

Có một runnable test cho chuỗi reducer:

```text
login.pending → login.fulfilled → restoreSession → logout
```

State cuối phải bằng initial state và không còn `user/token`.
