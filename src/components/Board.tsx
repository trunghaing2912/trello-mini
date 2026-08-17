export type TaskCardData = {
  id: string
  title: string
  labels?: string[]
  dueDate?: string
  comments?: number
  members?: string[]
}

export type BoardColumnData = {
  id: string
  title: string
  cards: TaskCardData[]
}

type BoardProps = {
  title: string
  columns: BoardColumnData[]
}

export function Board({ title, columns }: BoardProps) {
  return (
    <section aria-labelledby="board-title">
      <div className="board-heading">
        <div>
          <p className="eyebrow">Bảng công việc / Dự án</p>
          <h1 id="board-title">{title}</h1>
        </div>
        <button className="primary-button" type="button">＋ Thêm công việc</button>
      </div>

      <BoardToolbar />

      <div className="board-scroll">
        <div className="board-columns">
          {columns.map((column) => <BoardColumn key={column.id} column={column} />)}
        </div>
      </div>
    </section>
  )
}

function BoardToolbar() {
  return (
    <div className="board-toolbar" aria-label="Công cụ bảng">
      <button className="secondary-button" type="button">☷ Bộ lọc</button>
      <button className="ghost-button" type="button">⇅ Sắp xếp</button>
      <button className="ghost-button" type="button">☆ Yêu thích</button>
      <span className="toolbar-spacer" />
      <div className="members" aria-label="Thành viên của bảng">
        <span className="member">HN</span>
        <span className="member">AN</span>
        <span className="member">+2</span>
      </div>
      <button className="secondary-button" type="button">Chia sẻ</button>
    </div>
  )
}

function BoardColumn({ column }: { column: BoardColumnData }) {
  return (
    <section className="board-column" aria-labelledby={`column-${column.id}`}>
      <header className="column-heading">
        <h2 className="column-title" id={`column-${column.id}`}>
          {column.title}
          <span className="card-count">{column.cards.length}</span>
        </h2>
        <button className="icon-button" type="button" aria-label={`Tùy chọn ${column.title}`}>•••</button>
      </header>

      <div className="task-list">
        {column.cards.map((card) => <TaskCard key={card.id} card={card} />)}
      </div>
      <button className="add-card" type="button">＋ Thêm thẻ</button>
    </section>
  )
}

function TaskCard({ card }: { card: TaskCardData }) {
  return (
    <article className="task-card">
      {card.labels?.length ? (
        <div className="labels">
          {card.labels.map((label) => <span className="label" key={label}>{label}</span>)}
        </div>
      ) : null}
      <p className="task-title">{card.title}</p>
      <footer className="card-meta">
        {card.dueDate ? <span>◷ {card.dueDate}</span> : null}
        {card.comments ? <span>◌ {card.comments}</span> : null}
        {card.members?.length ? (
          <div className="members" aria-label="Người thực hiện">
            {card.members.map((member) => <span className="member" key={member}>{member}</span>)}
          </div>
        ) : null}
      </footer>
    </article>
  )
}
