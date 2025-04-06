interface WordDisplayProps {
  word: string;
  guessedLetters: Set<string>;
}

const WordDisplay = ({ word, guessedLetters }: WordDisplayProps) => {
  const displayWord = [...word]
    .map((letter) => (guessedLetters.has(letter) ? letter : "_"))
    .join(" ");

  return (
    <div className="word-display">
      <h3>Word: {displayWord}</h3>
    </div>
  );
};

export default WordDisplay;
