interface RiddleDisplayProps {
  riddle: string;
}

const RiddleDisplay = ({ riddle }: RiddleDisplayProps) => {
  return (
    <div className="riddle-display">
      <h2>Riddle: {riddle}</h2>
    </div>
  );
};

export default RiddleDisplay;
