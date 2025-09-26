import { useState } from "react";
import { BoardGrid } from "../components/BoardGrid";
import { ToolbarButton } from "../components/ToolbarButton";
import { NumberInput } from "../components/NumberInput";
import { Toggle } from "../components/Toggle";
import { Presets } from "../components/Presets";
import type { Cells } from "../types/board";

export default function Demo() {
  const [cells, setCells] = useState<Cells>([
    [false, false, false],
    [false, true, false],
    [false, false, false],
  ]);
  const [number, setNumber] = useState(5);
  const [toggle, setToggle] = useState(false);

  const handleToggleCell = (r: number, c: number) => {
    setCells((prev) =>
      prev.map((row, ri) =>
        row.map((cell, ci) => (ri === r && ci === c ? !cell : cell))
      )
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Components Demo</h1>

      {/* BoardGrid */}
      <section>
        <h2 className="text-lg font-semibold mb-2">BoardGrid</h2>
        <BoardGrid cells={cells} onToggle={handleToggleCell} />
      </section>

      {/* ToolbarButton */}
      <section>
        <h2 className="text-lg font-semibold mb-2">ToolbarButton</h2>
        <ToolbarButton onClick={() => alert("Clicked!")}>
          Click Me
        </ToolbarButton>
      </section>

      {/* NumberInput */}
      <section>
        <h2 className="text-lg font-semibold mb-2">NumberInput</h2>
        <NumberInput value={number} onChange={setNumber} min={1} max={10} />
        <p className="mt-2">Value: {number}</p>
      </section>

      {/* Toggle */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Toggle</h2>
        <Toggle checked={toggle} onChange={setToggle} label="Enable feature" />
        <p className="mt-2">Toggle: {toggle ? "ON" : "OFF"}</p>
      </section>

      {/* Presets */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Presets</h2>
        <Presets onSelect={setCells} />
      </section>
    </div>
  );
}
