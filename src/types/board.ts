export type Cells = boolean[][]; // rows × cols

export interface Board {
  id: string;
  name?: string;
  rows: number;
  cols: number;
  cells: Cells;
  createdAt: string;
}

export type TerminationReason = "Stable" | "Extinct" | "Loop" | "Unresolved";

export interface FinalStateResult {
  state: Cells;
  reason: TerminationReason;
  stepsTaken: number;
}
