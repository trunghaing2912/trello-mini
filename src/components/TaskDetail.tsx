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

const avatarClasses =
  "grid size-[34px] shrink-0 place-items-center rounded-full bg-[#dcd9ff] text-[10px] font-extrabold text-[#4037aa]";
const lightButtonClasses =
  "cursor-pointer rounded-[7px] border-0 bg-[#eef0f4] px-[11px] py-[7px] text-xs text-[#44546f] hover:bg-[#e2e5eb] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[rgba(99,91,255,0.28)]";
const addButtonClasses =
  "grid size-[34px] cursor-pointer place-items-center rounded-full border-0 bg-[#eef0f4] text-xl text-[#44546f] hover:bg-[#e2e5eb] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[rgba(99,91,255,0.28)]";
const sidebarButtonClasses =
  "flex w-full cursor-pointer items-center gap-[9px] rounded-lg border-0 bg-[#eef0f4] px-[11px] py-[9px] text-left text-xs text-[#344563] hover:bg-[#e2e5eb] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[rgba(99,91,255,0.28)] [&>span]:w-[17px] [&>span]:text-center [&>span]:text-[#5e6c84]";
const sectionHeadingClasses = "flex min-h-[34px] items-center gap-3.5";
const sectionIconClasses = "grid size-[34px] shrink-0 place-items-center text-xl font-extrabold text-[#44546f]";
const metaHeadingClasses = "mb-[9px] text-[11px] font-extrabold tracking-[0.06em] text-[#7a869a] uppercase";

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
    <div className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-[rgba(23,43,77,0.58)] px-5 py-8 backdrop-blur-[3px] max-[720px]:block max-[720px]:p-0">
      <section
        className="max-h-[calc(100vh-64px)] w-full max-w-[860px] overflow-y-auto rounded-[18px] border border-[#e5e8ef] bg-white shadow-[0_30px_80px_rgba(9,30,66,0.32)] max-[720px]:min-h-screen max-[720px]:max-h-none max-[720px]:rounded-none max-[720px]:border-0"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-detail-title"
      >
        <header className="sticky top-0 z-[2] flex items-start justify-between gap-6 border-b border-[#eef0f4] bg-[rgba(255,255,255,0.96)] px-7 pt-[26px] pb-5 backdrop-blur-[10px] max-[720px]:px-[18px]">
          <div className="flex items-start gap-3.5">
            <span className="grid size-[34px] shrink-0 place-items-center rounded-[9px] bg-[#efeeff] font-extrabold text-[#5147d9]" aria-hidden="true">✓</span>
            <div>
              <h2 className="mt-px mb-1.5 text-[clamp(21px,3vw,26px)] font-bold tracking-[-0.02em] text-[#172b4d]" id="task-detail-title">{task.title}</h2>
              <p className="m-0 text-[13px] text-[#7a869a]">
                trong danh sách{" "}
                <button className="cursor-pointer border-0 border-b border-current bg-transparent p-0 text-inherit" type="button">{columnTitle}</button>
              </p>
            </div>
          </div>
          <button
            className="grid size-[38px] shrink-0 cursor-pointer place-items-center rounded-full border-0 bg-transparent text-[26px] leading-none text-[#44546f] hover:bg-[#f0f1f5] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[rgba(99,91,255,0.28)]"
            type="button"
            aria-label="Đóng chi tiết công việc"
            onClick={() => navigate("/board")}
          >
            ×
          </button>
        </header>

        <div className="grid grid-cols-[minmax(0,1fr)_180px] gap-[34px] px-7 pt-[26px] pb-[34px] max-[720px]:grid-cols-1 max-[720px]:px-[18px]">
          <div className="min-w-0">
            <div className="ml-12 flex flex-wrap gap-x-[30px] gap-y-[22px] max-[720px]:ml-0">
              <section aria-labelledby="task-members-title">
                <h3 className={metaHeadingClasses} id="task-members-title">Thành viên</h3>
                <div className="flex items-center gap-1.5">
                  {task.members?.map((member, index) => (
                    <span className={`${avatarClasses} ${index % 2 ? "bg-[#d9eeff] text-[#1769aa]" : ""}`} key={member}>
                      {member}
                    </span>
                  ))}
                  <button className={addButtonClasses} type="button" aria-label="Thêm thành viên">+</button>
                </div>
              </section>

              <section aria-labelledby="task-labels-title">
                <h3 className={metaHeadingClasses} id="task-labels-title">Nhãn</h3>
                <div className="flex items-center gap-1.5">
                  {task.labels?.map((label, index) => (
                    <span
                      className={`rounded-[7px] px-[11px] py-2 text-[11px] font-extrabold ${index % 2 ? "bg-[#fff0db] text-[#a55300]" : "bg-[#e7f0ff] text-[#1d63b7]"}`}
                      key={label}
                    >
                      {label}
                    </span>
                  ))}
                  <button className={addButtonClasses} type="button" aria-label="Thêm nhãn">+</button>
                </div>
              </section>

              {task.dueDate ? (
                <section aria-labelledby="task-date-title">
                  <h3 className={metaHeadingClasses} id="task-date-title">Ngày hết hạn</h3>
                  <button className="flex cursor-pointer items-center gap-[7px] rounded-[7px] border-0 bg-[#f0f1f5] px-2.5 py-2 text-xs text-[#44546f] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[rgba(99,91,255,0.28)]" type="button">
                    <span aria-hidden="true">◷</span> {task.dueDate}
                    {task.dueStatus ? <span className="ml-0.5 rounded-[5px] bg-[#ffebe6] px-1.5 py-[3px] text-[9px] font-extrabold text-[#c9372c] uppercase">{task.dueStatus}</span> : null}
                  </button>
                </section>
              ) : null}
            </div>

            <section className="mt-[34px]" aria-labelledby="task-description-title">
              <div className={sectionHeadingClasses}>
                <span className={sectionIconClasses} aria-hidden="true">≡</span>
                <h3 className="m-0 text-base font-bold text-[#263752]" id="task-description-title">Mô tả</h3>
                <button className={`${lightButtonClasses} ml-auto`} type="button">Chỉnh sửa</button>
              </div>
              <p className="mt-2.5 ml-12 rounded-[10px] bg-[#f7f8fa] px-4 py-[15px] text-sm leading-[1.65] text-[#44546f] max-[480px]:ml-0">{task.description}</p>
            </section>

            <section className="mt-8" aria-labelledby="task-checklist-title">
              <div className={sectionHeadingClasses}>
                <span className={sectionIconClasses} aria-hidden="true">☑</span>
                <h3 className="m-0 text-base font-bold text-[#263752]" id="task-checklist-title">Checklist</h3>
                <button className={`${lightButtonClasses} ml-auto`} type="button">Xóa</button>
              </div>

              <div className="mt-[13px] grid grid-cols-[34px_1fr] items-center gap-3.5 text-[11px] text-[#7a869a]">
                <span>{progress}%</span>
                <progress
                  className="h-2 w-full appearance-none overflow-hidden rounded-full border-0 bg-[#e5e8ef] [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-[#e5e8ef] [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-[#635bff] [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-[#635bff]"
                  max={task.checklist.length}
                  value={completedItems}
                  aria-label={`Tiến độ ${progress}%`}
                />
              </div>

              <ul className="mt-2.5 mb-2.5 ml-[34px] grid list-none gap-0.5 p-0">
                {task.checklist.map((item) => {
                  const inputId = `task-${task.id}-${item.id}`;

                  return (
                    <li className="flex items-start gap-2.5 rounded-lg px-2.5 py-[9px] text-[13px] text-[#344563] hover:bg-[#f7f8fa]" key={item.id}>
                      <input className="peer mt-px size-4 accent-[#635bff] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[rgba(99,91,255,0.28)]" id={inputId} type="checkbox" defaultChecked={item.completed} />
                      <label className="peer-checked:text-[#8993a4] peer-checked:line-through" htmlFor={inputId}>{item.text}</label>
                    </li>
                  );
                })}
              </ul>

              <button className={`${lightButtonClasses} ml-12`} type="button">Thêm mục</button>
            </section>

            <section className="mt-8" aria-labelledby="task-activity-title">
              <div className={sectionHeadingClasses}>
                <span className={sectionIconClasses} aria-hidden="true">☷</span>
                <h3 className="m-0 text-base font-bold text-[#263752]" id="task-activity-title">Hoạt động</h3>
                <button className={`${lightButtonClasses} ml-auto`} type="button">Hiện chi tiết</button>
              </div>

              <div className="mt-3 flex items-start gap-2.5">
                <span className={avatarClasses}>HN</span>
                <textarea
                  className="min-h-[72px] w-full resize-y rounded-[10px] border border-[#dfe2e8] bg-white px-3.5 py-3 text-[13px] text-[#172b4d] shadow-[0_2px_8px_rgba(23,43,77,0.07)] focus:border-[#635bff] focus:outline-0 focus:shadow-[0_0_0_3px_rgba(99,91,255,0.12)]"
                  aria-label="Viết bình luận"
                  placeholder="Viết bình luận..."
                  rows={3}
                />
              </div>

              <article className="mt-5 flex items-start gap-2.5 text-xs leading-6 text-[#44546f]">
                <span className={avatarClasses}>{task.activity.initials}</span>
                <div>
                  <p className="mt-px mb-0.5"><strong>{task.activity.author}</strong> {task.activity.message}</p>
                  <time className="text-[11px] text-[#8993a4]" dateTime={task.activity.dateTime}>{task.activity.timeLabel}</time>
                </div>
              </article>
            </section>
          </div>

          <aside className="grid content-start gap-6 max-[720px]:grid-cols-2 max-[480px]:grid-cols-1" aria-label="Thao tác với công việc">
            <section className="grid gap-[7px]">
              <h3 className={metaHeadingClasses}>Thêm vào thẻ</h3>
              <button className={sidebarButtonClasses} type="button"><span aria-hidden="true">♙</span> Thành viên</button>
              <button className={sidebarButtonClasses} type="button"><span aria-hidden="true">▰</span> Nhãn</button>
              <button className={sidebarButtonClasses} type="button"><span aria-hidden="true">☑</span> Checklist</button>
              <button className={sidebarButtonClasses} type="button"><span aria-hidden="true">◷</span> Ngày hết hạn</button>
              <button className={sidebarButtonClasses} type="button"><span aria-hidden="true">♧</span> Đính kèm</button>
            </section>

            <section className="grid gap-[7px]">
              <h3 className={metaHeadingClasses}>Thao tác</h3>
              <button className={sidebarButtonClasses} type="button"><span aria-hidden="true">→</span> Di chuyển</button>
              <button className={sidebarButtonClasses} type="button"><span aria-hidden="true">▣</span> Sao chép</button>
              <button className={sidebarButtonClasses} type="button"><span aria-hidden="true">↗</span> Chia sẻ</button>
              <button className={`${sidebarButtonClasses} text-[#ae2e24] hover:bg-[#ffebe6]`} type="button"><span aria-hidden="true">♲</span> Xóa</button>
            </section>
          </aside>
        </div>
      </section>
    </div>
  );
}
