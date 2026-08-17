import './App.css'
import { AppShell } from './components/AppShell'
import { Board, type BoardColumnData } from './components/Board'

const columns: BoardColumnData[] = [
  {
    id: 'backlog',
    title: 'Backlog',
    cards: [
      { id: '1', title: 'Thiết kế trang đăng nhập', labels: ['Design'], comments: 3 },
      { id: '2', title: 'Chuẩn hóa cấu trúc Redux store', labels: ['Frontend'] },
    ],
  },
  {
    id: 'progress',
    title: 'Đang thực hiện',
    cards: [
      {
        id: '3',
        title: 'Dựng layout Kanban',
        labels: ['Frontend', 'Ưu tiên'],
        dueDate: '18/08',
        comments: 5,
        members: ['HN', 'AN'],
      },
      { id: '4', title: 'Tạo bộ component dùng chung', labels: ['Frontend'], members: ['HN'] },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    cards: [
      { id: '5', title: 'Kiểm tra responsive', labels: ['QA'], dueDate: '20/08', members: ['AN'] },
    ],
  },
  {
    id: 'done',
    title: 'Hoàn thành',
    cards: [
      { id: '6', title: 'Khởi tạo dự án React', labels: ['Setup'], members: ['HN'] },
    ],
  },
]

function App() {
  return (
    <AppShell>
      <Board title="Website tuyển dụng" columns={columns} />
    </AppShell>
  )
}

export default App
