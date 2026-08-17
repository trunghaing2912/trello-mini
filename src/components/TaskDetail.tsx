import { Navigate, useNavigate, useParams } from "react-router-dom";
import boardJson from "../data/board.json";
import type { BoardData, TaskCardData } from "../types/board";

type TaskEntry = {
  columnTitle: string;
  task: TaskCardData;
};

const boardData = boardJson as BoardData;
const tasksById = new Map<string, TaskEntry>(
  boardData.columns.flatMap((column) =>
    column.cards.map((task) => [task.id, { columnTitle: column.title, task }]),
  ),
);

export default function TaskDetail() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const entry = taskId ? tasksById.get(taskId) : undefined;

  if (!entry) {
    return <Navigate to="/board" replace />;
  }

  const { columnTitle, task } = entry;
  const completedItems = task.checklist.filter((item) => item.completed).length;
  const progress = task.checklist.length
    ? Math.round((completedItems / task.checklist.length) * 100)
    : 0;

  return (
    <div className="task-detail-backdrop">
      <section
        className="task-detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-detail-title"
      >
        <header className="task-detail-header">
          <div className="task-detail-title-wrap">
            <span className="task-detail-title-icon" aria-hidden="true">✓</span>
            <div>
              <h2 id="task-detail-title">{task.title}</h2>
              <p>
                trong danh sách{" "}
                <button className="task-detail-link" type="button">{columnTitle}</button>
              </p>
            </div>
          </div>
          <button
            className="task-detail-close"
            type="button"
            aria-label="Đóng chi tiết công việc"
            onClick={() => navigate("/board")}
          >
            ×
          </button>
        </header>

        <div className="task-detail-body">
          <div className="task-detail-main">
            <div className="task-detail-metadata">
              <section className="task-detail-meta-group" aria-labelledby="task-members-title">
                <h3 id="task-members-title">Thành viên</h3>
                <div className="task-detail-members">
                  {task.members?.map((member, index) => (
                    <span
                      className={`task-detail-avatar${index % 2 ? " task-detail-avatar-blue" : ""}`}
                      key={member}
                    >
                      {member}
                    </span>
                  ))}
                  <button className="task-detail-add-circle" type="button" aria-label="Thêm thành viên">+</button>
                </div>
              </section>

              <section className="task-detail-meta-group" aria-labelledby="task-labels-title">
                <h3 id="task-labels-title">Nhãn</h3>
                <div className="task-detail-labels">
                  {task.labels?.map((label, index) => (
                    <span
                      className={`task-detail-label ${index % 2 ? "task-detail-label-orange" : "task-detail-label-blue"}`}
                      key={label}
                    >
                      {label}
                    </span>
                  ))}
                  <button className="task-detail-add-circle" type="button" aria-label="Thêm nhãn">+</button>
                </div>
              </section>

              {task.dueDate ? (
                <section className="task-detail-meta-group" aria-labelledby="task-date-title">
                  <h3 id="task-date-title">Ngày hết hạn</h3>
                  <button className="task-detail-date" type="button">
                    <span aria-hidden="true">◷</span> {task.dueDate}
                    {task.dueStatus ? <span className="task-detail-status">{task.dueStatus}</span> : null}
                  </button>
                </section>
              ) : null}
            </div>

            <section className="task-detail-section" aria-labelledby="task-description-title">
              <div className="task-detail-section-heading">
                <span className="task-detail-section-icon" aria-hidden="true">≡</span>
                <h3 id="task-description-title">Mô tả</h3>
                <button className="task-detail-light-button" type="button">Chỉnh sửa</button>
              </div>
              <p className="task-detail-description">{task.description}</p>
            </section>

            <section className="task-detail-section" aria-labelledby="task-checklist-title">
              <div className="task-detail-section-heading">
                <span className="task-detail-section-icon" aria-hidden="true">☑</span>
                <h3 id="task-checklist-title">Checklist</h3>
                <button className="task-detail-light-button" type="button">Xóa</button>
              </div>

              <div className="task-detail-progress-row">
                <span>{progress}%</span>
                <progress
                  className="task-detail-progress"
                  max={task.checklist.length}
                  value={completedItems}
                  aria-label={`Tiến độ ${progress}%`}
                />
              </div>

              <ul className="task-detail-checklist">
                {task.checklist.map((item) => {
                  const inputId = `task-${task.id}-${item.id}`;

                  return (
                    <li key={item.id}>
                      <input id={inputId} type="checkbox" defaultChecked={item.completed} />
                      <label htmlFor={inputId}>{item.text}</label>
                    </li>
                  );
                })}
              </ul>

              <button className="task-detail-light-button task-detail-add-item" type="button">
                Thêm mục
              </button>
            </section>

            <section className="task-detail-section" aria-labelledby="task-activity-title">
              <div className="task-detail-section-heading">
                <span className="task-detail-section-icon" aria-hidden="true">☷</span>
                <h3 id="task-activity-title">Hoạt động</h3>
                <button className="task-detail-light-button" type="button">Hiện chi tiết</button>
              </div>

              <div className="task-detail-comment-box">
                <span className="task-detail-avatar">HN</span>
                <textarea aria-label="Viết bình luận" placeholder="Viết bình luận..." rows={3} />
              </div>

              <article className="task-detail-activity">
                <span className="task-detail-avatar">{task.activity.initials}</span>
                <div>
                  <p><strong>{task.activity.author}</strong> {task.activity.message}</p>
                  <time dateTime={task.activity.dateTime}>{task.activity.timeLabel}</time>
                </div>
              </article>
            </section>
          </div>

          <aside className="task-detail-sidebar" aria-label="Thao tác với công việc">
            <section>
              <h3>Thêm vào thẻ</h3>
              <button type="button"><span aria-hidden="true">♙</span> Thành viên</button>
              <button type="button"><span aria-hidden="true">▰</span> Nhãn</button>
              <button type="button"><span aria-hidden="true">☑</span> Checklist</button>
              <button type="button"><span aria-hidden="true">◷</span> Ngày hết hạn</button>
              <button type="button"><span aria-hidden="true">♧</span> Đính kèm</button>
            </section>

            <section>
              <h3>Thao tác</h3>
              <button type="button"><span aria-hidden="true">→</span> Di chuyển</button>
              <button type="button"><span aria-hidden="true">▣</span> Sao chép</button>
              <button type="button"><span aria-hidden="true">↗</span> Chia sẻ</button>
              <button className="task-detail-danger" type="button"><span aria-hidden="true">♲</span> Xóa</button>
            </section>
          </aside>
        </div>
      </section>
    </div>
  );
}
