type WordDisplayProps = {
  selectedWord: string;
  guessedLetters: Set<string>;
};

const WordDisplay: React.FC<WordDisplayProps> = ({
  selectedWord,
  guessedLetters,
}) => {
  const displayWord = [...selectedWord]
    .map((letter) => (guessedLetters.has(letter) ? letter : "_"))
    .join(" ");

  return <h3 id="word-display">{displayWord}</h3>;
};

export default WordDisplay;
