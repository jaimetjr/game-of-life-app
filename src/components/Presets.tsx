import type { Cells } from "../types/board";

interface PresetsProps {
  onSelect: (cells: Cells) => void;
}

export function Presets({ onSelect }: PresetsProps) {
  const glider: Cells = [
    [false, true, false],
    [false, false, true],
    [true, true, true],
  ];

  const blinker: Cells = [
    [false, false, false],
    [true, true, true],
    [false, false, false],
  ];

  return (
    <div className="flex gap-2">
      <button
        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        onClick={() => onSelect(glider)}
      >
        Glider
      </button>
      <button
        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        onClick={() => onSelect(blinker)}
      >
        Blinker
      </button>
    </div>
  );
}
