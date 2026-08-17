import "./App.css";
import boardJson from "./data/board.json";
import { AppShell } from "./components/AppShell";
import { Board } from "./components/Board";
import type { BoardData } from "./types/board";

const boardData = boardJson as BoardData;

function App() {
  return (
    <AppShell>
      <Board title={boardData.title} columns={boardData.columns} />
    </AppShell>
  );
}

export default App;
