const RiddleDisplay = ({ riddle }: any) => {
  console.log("RiddleDisplay Props:", riddle);
  return (
    <div className="riddle-display">
      <h2>Riddle: {riddle.question}</h2>
    </div>
  );
};

export default RiddleDisplay;
