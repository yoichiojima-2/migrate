interface buttonProps {
  text: string;
  isPressed: boolean;
  onClick: () => void;
}

const Button: React.FC<buttonProps> = ({ text, isPressed, onClick }) => (
  <button
    className={`m-4 p-4 rounded-xl ${isPressed && "bg-gray-700" }
  `}
    onClick={() => onClick()}
  >
    {text}
  </button>
);

export default Button;
