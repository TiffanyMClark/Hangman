type HangmanCanvasProps = {
  incorrectGuesses: number;
  difficulty: "easy" | "normal" | "hard";
};

const HangmanCanvas: React.FC<HangmanCanvasProps> = ({
  incorrectGuesses,
  difficulty,
}) => {
  const maxMistakes = {
    easy: 8,
    normal: 6,
    hard: 4,
  };

  const parts = [
    "head",
    "body",
    "left-arm",
    "right-arm",
    "left-leg",
    "right-leg",
  ];

  const drawPart = (part: string) => {
    return <div className={`hangman-part ${part}`} key={part} />;
  };

  return (
    <div className="hangman-canvas">
      {/* Render hangman parts based on incorrect guesses */}
      {parts
        .slice(0, Math.min(incorrectGuesses, maxMistakes[difficulty]))
        .map(drawPart)}

      {/* You can replace the above divs with an SVG if you prefer a more complex structure */}
    </div>
  );
};

export default HangmanCanvas;
