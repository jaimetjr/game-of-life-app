import type { Board, Cells, FinalStateResult } from "../types/board";
import { computeNext, advance, findFinalState } from "../engine/gameOfLife";

function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export class GameOfLifeClient {
  private boards: Map<string, Board> = new Map();

  upload(name: string | undefined, cells: Cells): { id: string } {
    if (!cells || cells.length === 0) throw new Error("Board cannot be empty");
    const rows = cells.length;
    const cols = cells[0].length;

    if (rows > 200 || cols > 200) {
      throw new Error("Max board size is 200x200");
    }

    const id = generateId();
    const board: Board = {
      id,
      name,
      rows,
      cols,
      cells,
      createdAt: new Date().toISOString(),
    };
    this.boards.set(id, board);
    return { id };
  }

  next(id: string): Cells {
    const board = this.boards.get(id);
    if (!board) throw new Error("Board not found");
    return computeNext(board.cells);
  }

  advance(id: string, steps: number): Cells {
    if (steps <= 0 || steps > 10000) {
      throw new Error("Steps must be between 1 and 10000");
    }
    const board = this.boards.get(id);
    if (!board) throw new Error("Board not found");
    return advance(board.cells, steps);
  }

  final(id: string, maxAttempts: number): FinalStateResult {
    if (maxAttempts <= 0 || maxAttempts > 10000) {
      throw new Error("maxAttempts must be between 1 and 10000");
    }
    const board = this.boards.get(id);
    if (!board) throw new Error("Board not found");
    return findFinalState(board.cells, maxAttempts);
  }
}
