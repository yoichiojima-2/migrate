interface PickerProps {
  picked: string;
  options: string[];
  onPick: (value: string) => void;
}

const Picker: React.FC<PickerProps> = ({ picked, options, onPick }) => (
  <div>
    <select value={picked} onChange={(e) => onPick(e.target.value)}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default Picker;
