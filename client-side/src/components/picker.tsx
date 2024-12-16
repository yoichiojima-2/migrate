const Picker = ({ picked, options, onPick }) => {
  return (
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
};

export default Picker;
