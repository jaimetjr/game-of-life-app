import type { Cells } from "../types/board";

interface BoardGridProps {
  cells: Cells;
  onToggle: (row: number, col: number) => void;
}

export function BoardGrid({ cells, onToggle }: BoardGridProps) {
  return (
    <div className="inline-block">
      {cells.map((row, r) => (
        <div key={r} className="flex">
          {row.map((alive, c) => (
            <div
              key={c}
              onClick={() => onToggle(r, c)}
              className={`w-5 h-5 border border-gray-300 cursor-pointer ${
                alive ? "bg-blue-600" : "bg-white"
              }`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
