import { useNavigate } from "react-router-dom";
import type { BoardColumnData, TaskCardData } from "../types/board";

type BoardProps = {
  title: string;
  columns: BoardColumnData[];
};

const toolbarButtonClasses =
  "cursor-pointer rounded-[9px] border-0 bg-[#f4f5f7] px-3 py-2 text-[#44546f] hover:bg-[#eef0f6] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[rgba(99,91,255,0.35)]";

const memberClasses =
  "-ml-[7px] grid size-[30px] shrink-0 place-items-center rounded-full border-2 border-white bg-[#dcd9ff] text-[9px] font-[750] text-[#4037aa] first:ml-0";

export function Board({ title, columns }: BoardProps) {
  return (
    <section aria-labelledby="board-title">
      <div className="mb-5 flex items-center justify-between gap-6 max-[800px]:flex-col max-[800px]:items-start">
        <div>
          <p className="m-0 text-[13px] text-[#7a869a]">Bảng công việc / Dự án</p>
          <h1 className="mt-0 mb-1 text-[clamp(22px,3vw,30px)] font-bold" id="board-title">{title}</h1>
        </div>
        <button className="cursor-pointer rounded-[9px] border-0 bg-[#635bff] px-4 py-2.5 font-bold text-white shadow-[0_5px_14px_rgba(99,91,255,0.22)] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[rgba(99,91,255,0.35)]" type="button">
          ＋ Thêm công việc
        </button>
      </div>

      <BoardToolbar />

      <div className="overflow-x-auto pb-4">
        <div className="grid min-w-[1100px] grid-cols-4 items-start gap-4">
          {columns.map((column) => <BoardColumn key={column.id} column={column} />)}
        </div>
      </div>
    </section>
  );
}

function BoardToolbar() {
  return (
    <div className="mb-[22px] flex flex-wrap items-center gap-2.5 rounded-xl border border-[#e5e8ef] bg-white p-3" aria-label="Công cụ bảng">
      <button className={toolbarButtonClasses} type="button">☷ Bộ lọc</button>
      <button className={`${toolbarButtonClasses} bg-transparent`} type="button">⇅ Sắp xếp</button>
      <button className={`${toolbarButtonClasses} bg-transparent`} type="button">☆ Yêu thích</button>
      <span className="flex-1" />
      <div className="flex items-center" aria-label="Thành viên của bảng">
        <span className={memberClasses}>HN</span>
        <span className={memberClasses}>AN</span>
        <span className={memberClasses}>+2</span>
      </div>
      <button className={toolbarButtonClasses} type="button">Chia sẻ</button>
    </div>
  );
}

function BoardColumn({ column }: { column: BoardColumnData }) {
  return (
    <section className="rounded-[14px] border border-[#e4e7ec] bg-[#eff1f5] p-3" aria-labelledby={`column-${column.id}`}>
      <header className="flex items-center justify-between px-1 pt-0.5 pb-3">
        <h2 className="m-0 flex items-center gap-2 text-sm font-bold" id={`column-${column.id}`}>
          {column.title}
          <span className="rounded-[10px] bg-[#dfe2e8] px-[7px] py-0.5 text-[11px] font-normal text-[#5e6c84]">{column.cards.length}</span>
        </h2>
        <button className="grid size-[38px] cursor-pointer place-items-center rounded-full border-0 bg-transparent text-[#44546f] hover:bg-[#eef0f6] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[rgba(99,91,255,0.35)]" type="button" aria-label={`Tùy chọn ${column.title}`}>
          •••
        </button>
      </header>

      <div className="grid gap-2.5">
        {column.cards.map((card) => <TaskCard key={card.id} card={card} />)}
      </div>
      <button className="mt-2.5 w-full cursor-pointer rounded-[9px] border-0 bg-transparent px-2.5 py-[9px] text-left text-[#5e6c84] hover:bg-[#e1e4ea] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[rgba(99,91,255,0.35)]" type="button">
        ＋ Thêm thẻ
      </button>
    </section>
  );
}

function TaskCard({ card }: { card: TaskCardData }) {
  const navigate = useNavigate();

  return (
    <button
      className="block w-full cursor-pointer rounded-[11px] border border-[#e5e8ef] bg-white p-3.5 text-left text-inherit shadow-[0_1px_2px_rgba(23,43,77,0.06)] hover:border-[#c8c5ff] hover:shadow-[0_6px_16px_rgba(23,43,77,0.08)] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[rgba(99,91,255,0.35)]"
      type="button"
      onClick={() => navigate(`/boards/demo/${card.id}`)}
      aria-label={`Xem chi tiết: ${card.title}`}
    >
      {card.labels?.length ? (
        <span className="mb-2.5 flex flex-wrap gap-[5px]">
          {card.labels.map((label, index) => (
            <span
              className={`rounded-md px-[7px] py-[3px] text-[10px] font-extrabold ${index % 2 ? "bg-[#fff0db] text-[#a55300]" : "bg-[#e7f0ff] text-[#1d63b7]"}`}
              key={label}
            >
              {label}
            </span>
          ))}
        </span>
      ) : null}
      <span className="mb-3.5 block text-sm leading-[1.45] font-[650] text-[#263752]">{card.title}</span>
      <span className="flex min-h-6 items-center gap-2.5 text-[11px] text-[#7a869a]">
        {card.dueDate ? <span>◷ {card.dueDate}</span> : null}
        {card.comments ? <span>◌ {card.comments}</span> : null}
        {card.members?.length ? (
          <span className="ml-auto flex items-center" aria-label="Người thực hiện">
            {card.members.map((member) => <span className={memberClasses} key={member}>{member}</span>)}
          </span>
        ) : null}
      </span>
    </button>
  );
}
