interface RiddleDisplayProps {
  riddle: string;
}

const RiddleDisplay = ({ riddle }: RiddleDisplayProps) => {
  const riddleLetters = riddle.split("").map((char, index) => (
    <span key={index} data-letter={char}>
      {char}
    </span>
  ));

  return (
    <div className="riddle-display">
      <h2>Riddle: {riddleLetters}</h2>
    </div>
  );
};

export default RiddleDisplay;
