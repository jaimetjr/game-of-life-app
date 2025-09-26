import { useState, useEffect, useRef } from "react";
import { BoardGrid } from "../components/BoardGrid";
import { ToolbarButton } from "../components/ToolbarButton";
import { NumberInput } from "../components/NumberInput";
import { Presets } from "../components/Presets";
import type { Cells } from "../types/board";
import { computeNext, advance, findFinalState } from "../engine/gameOfLife";

export default function GamePage() {
  const [cells, setCells] = useState<Cells>(
    Array.from({ length: 10 }, () => Array(10).fill(false))
  );
  const [generation, setGeneration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalMs, setIntervalMs] = useState(500);
  const [steps, setSteps] = useState(5);
  const [finalMessage, setFinalMessage] = useState<string | null>(null);

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        stepNext();
      }, intervalMs);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, intervalMs]);

  const toggleCell = (r: number, c: number) => {
    setCells((prev) =>
      prev.map((row, ri) =>
        row.map((cell, ci) => (ri === r && ci === c ? !cell : cell))
      )
    );
  };

  const stepNext = () => {
    setCells((prev) => {
      const next = computeNext(prev);
      return next;
    });
    setGeneration((g) => g + 1);
  };

  const advanceSteps = () => {
    setCells((prev) => {
      const next = advance(prev, steps);
      return next;
    });
    setGeneration((g) => g + steps);
  };

  const computeFinal = () => {
    const result = findFinalState(cells, 200);
    setCells(result.state);
    setFinalMessage(`Final state: ${result.reason} after ${result.stepsTaken} steps`);
    setGeneration((g) => g + result.stepsTaken);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Conway&apos;s Game of Life</h1>

      <div className="flex gap-4">
        <BoardGrid cells={cells} onToggle={toggleCell} />
        <div className="flex flex-col gap-2">
          <ToolbarButton onClick={stepNext}>Next</ToolbarButton>
          <ToolbarButton onClick={() => setIsPlaying((p) => !p)}>
            {isPlaying ? "Pause" : "Play"}
          </ToolbarButton>
          <div className="flex items-center gap-2">
            <NumberInput value={steps} onChange={setSteps} min={1} max={100} />
            <ToolbarButton onClick={advanceSteps}>Advance X</ToolbarButton>
          </div>
          <ToolbarButton onClick={computeFinal}>Final State</ToolbarButton>
          <Presets onSelect={setCells} />
        </div>
      </div>

      <div className="space-y-2">
        <p>
          <span className="font-semibold">Generation:</span> {generation}
        </p>
        <p>
          <span className="font-semibold">Board size:</span> {cells.length} × {cells[0].length}
        </p>
        {finalMessage && <p className="text-red-600">{finalMessage}</p>}
        <div className="flex items-center gap-2">
          <label className="text-sm">Speed (ms)</label>
          <NumberInput value={intervalMs} onChange={setIntervalMs} min={100} max={2000} />
        </div>
      </div>
    </div>
  );
}
