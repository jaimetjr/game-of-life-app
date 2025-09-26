interface ToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
}

export function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      {label && <span className="text-sm text-gray-700">{label}</span>}
      <div
        onClick={() => onChange(!checked)}
        className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
          checked ? "bg-green-500" : "bg-gray-400"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </div>
    </label>
  );
}
