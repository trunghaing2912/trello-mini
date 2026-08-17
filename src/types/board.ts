export type ChecklistItem = {
  id: string;
  text: string;
  completed: boolean;
};

export type TaskActivity = {
  author: string;
  initials: string;
  message: string;
  timeLabel: string;
  dateTime: string;
};

export type TaskCardData = {
  id: string;
  title: string;
  labels?: string[];
  dueDate?: string;
  dueStatus?: string;
  comments?: number;
  members?: string[];
  description: string;
  checklist: ChecklistItem[];
  activity: TaskActivity;
};

export type BoardColumnData = {
  id: string;
  title: string;
  cards: TaskCardData[];
};

export type BoardData = {
  title: string;
  columns: BoardColumnData[];
};
