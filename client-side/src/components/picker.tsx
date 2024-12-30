interface PickerProps {
  picked: string;
  options: string[];
  onPick: (value: string) => void;
}

const Picker: React.FC<PickerProps> = ({ picked, options, onPick }) => (
  <div className="p-4 max-w-md mx-auto">
    <select
      className="block w-full bg-gray-800 text-white border border-gray-600 rounded-md px-4 py-2 appearance-none"
      value={picked}
      onChange={(e) => onPick(e.target.value)}
    >
      {options.map((option) => (
        <option className="bg-gray-800 text-white" key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default Picker;
