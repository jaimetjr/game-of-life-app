import type { Cells, FinalStateResult } from "../types/board";

/** Ensure the board is rectangular */
function validateRectangular(cells: Cells) {
  if (!cells) throw new Error("Cells cannot be null");
  if (cells.length === 0) return;
  const cols = cells[0].length;
  for (let r = 1; r < cells.length; r++) {
    if (cells[r].length !== cols) throw new Error("Board must be rectangular");
  }
}

export function cloneBoard(cells: Cells): Cells {
  return cells.map((row) => row.slice());
}

export function countNeighbors(cells: Cells, r: number, c: number): number {
  const rows = cells.length;
  const cols = rows ? cells[0].length : 0;
  let cnt = 0;
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && cells[nr][nc]) cnt++;
    }
  }
  return cnt;
}

export function computeNext(cells: Cells): Cells {
  validateRectangular(cells);
  const rows = cells.length;
  const cols = rows ? cells[0].length : 0;
  const next: Cells = Array.from({ length: rows }, () => Array(cols).fill(false));
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const neighbors = countNeighbors(cells, r, c);
      const alive = cells[r][c];
      next[r][c] = alive ? neighbors === 2 || neighbors === 3 : neighbors === 3;
    }
  }
  return next;
}

export function advance(cells: Cells, steps: number): Cells {
  if (steps < 0) throw new Error("steps must be >= 0");
  validateRectangular(cells);
  let cur = cloneBoard(cells);
  for (let i = 0; i < steps; i++) {
    cur = computeNext(cur);
  }
  return cur;
}

export function serialize(cells: Cells): string {
  return cells.map((row) => row.map((v) => (v ? "1" : "0")).join("")).join("|");
}

function cellsEqual(a: Cells, b: Cells): boolean {
  if (a.length !== b.length) return false;
  for (let r = 0; r < a.length; r++) {
    if (a[r].length !== b[r].length) return false;
    for (let c = 0; c < a[r].length; c++) {
      if (a[r][c] !== b[r][c]) return false;
    }
  }
  return true;
}

function isAllDead(cells: Cells): boolean {
  for (let r = 0; r < cells.length; r++) {
    for (let c = 0; c < cells[r].length; c++) {
      if (cells[r][c]) return false;
    }
  }
  return true;
}

export function findFinalState(start: Cells, maxAttempts: number): FinalStateResult {
  if (maxAttempts <= 0) throw new Error("maxAttempts must be > 0");
  validateRectangular(start);
  const seen = new Set<string>();
  let current = cloneBoard(start);
  let steps = 0;
  seen.add(serialize(current));
  while (steps < maxAttempts) {
    if (isAllDead(current)) return { state: current, reason: "Extinct", stepsTaken: steps };
    const next = computeNext(current);
    if (cellsEqual(current, next)) return { state: next, reason: "Stable", stepsTaken: steps + 1 };
    const h = serialize(next);
    if (seen.has(h)) return { state: next, reason: "Loop", stepsTaken: steps + 1 };
    seen.add(h);
    current = next;
    steps++;
  }
  return { state: current, reason: "Unresolved", stepsTaken: steps };
}
