interface buttonProps {
  text: string;
  onClick: () => void;
}

const Button: React.FC<buttonProps> = ({ text, onClick }) => (
  <button className="m-4 p-4" onClick={() => onClick()}>
    {text}
  </button>
);

export default Button;
