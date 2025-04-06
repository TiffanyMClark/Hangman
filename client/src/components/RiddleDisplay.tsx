type RiddleDisplayProps = {
  riddle: string;
};

const RiddleDisplay: React.FC<RiddleDisplayProps> = ({ riddle }) => {
  return <h2 id="riddle-display">{riddle}</h2>;
};

export default RiddleDisplay;
