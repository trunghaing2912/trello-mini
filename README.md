# Trello Mini

Ứng dụng Kanban dùng để luyện React hooks, Redux Toolkit và quản lý server state. Dự án hiện có layout responsive và đang triển khai milestone đầu tiên: authentication và protected routes.

## Công nghệ

- React + TypeScript + Vite
- Redux Toolkit + React Redux
- React Router
- CSS thuần

## Chạy dự án

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
```

## Tài liệu dự án

- [REQUIREMENTS.md](./REQUIREMENTS.md): requirement và tiêu chí nghiệm thu.
- [PROGRESS.md](./PROGRESS.md): tiến độ hiện tại và việc tiếp theo.

## Cấu trúc hiện tại

```text
src/
├── api/          # Hàm mô phỏng API
├── components/   # Layout và component giao diện
├── redux/        # Store, typed hooks và slices
├── router/       # Routes của ứng dụng
├── App.tsx
└── main.tsx
```

## Làm việc trên thiết bị mới

```bash
git clone <repository-url>
cd trello-mini
npm install
npm run dev
```

`node_modules`, `dist` và file chứa secret không được commit. Trước khi đổi thiết bị, cập nhật `PROGRESS.md`, commit và push thay đổi mới nhất.
