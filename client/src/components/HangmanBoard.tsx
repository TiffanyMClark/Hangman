import React from "react";

function HangmanBoard({
  incorrectGuesses,
  maxMistakes,
  difficulty,
}: {
  incorrectGuesses: number;
  maxMistakes: Record<string, number>;
  difficulty: string;
}) {
  // SVG Hangman board structure
  return (
    <div id="hangman-container">
      <svg id="hangman-svg" width="200" height="250" viewBox="0 0 200 250">
        {/* Gallows bottom bar: The base of the gallows */}
        <line
          x1="20"
          y1="220"
          x2="100"
          y2="220"
          stroke="black"
          strokeWidth="5"
        />
        {/* Tall bar: The vertical bar supporting the crossbar */}
        <line x1="60" y1="220" x2="60" y2="20" stroke="black" strokeWidth="5" />
        {/* Top short bar: The crossbar where the rope hangs from */}
        <line x1="60" y1="20" x2="140" y2="20" stroke="black" strokeWidth="5" />
        {/* Drop down bar for the hanging part: The vertical bar for the rope */}
        <line
          x1="140"
          y1="20"
          x2="140"
          y2="50"
          stroke="black"
          strokeWidth="5"
        />
        {/* Hanging rope: Invisible, but visually it represents where the rope would be. */}

        {/* Hangman Parts (Head, Body, Arms, Legs) */}
        {/* Initially hidden and will be displayed one by one based on incorrect guesses */}

        {/* Head: Appears when a certain number of incorrect guesses are made */}
        <circle
          id="head"
          className="hangman-part"
          cx="140"
          cy="70"
          r="20"
          stroke="black"
          strokeWidth="3"
          fill="none"
          style={{ display: incorrectGuesses >= 1 ? "block" : "none" }} // Show head on first wrong guess
        />
        {/* Body: Appears after head */}
        <line
          id="body"
          className="hangman-part"
          x1="140"
          y1="90"
          x2="140"
          y2="150"
          stroke="black"
          strokeWidth="3"
          style={{ display: incorrectGuesses >= 2 ? "block" : "none" }} // Show body after second wrong guess
        />
        {/* Left Arm: Appears after body */}
        <line
          id="left-arm"
          className="hangman-part"
          x1="140"
          y1="100"
          x2="120"
          y2="130"
          stroke="black"
          strokeWidth="3"
          style={{ display: incorrectGuesses >= 3 ? "block" : "none" }} // Show left arm on third wrong guess
        />
        {/* Right Arm: Appears after left arm */}
        <line
          id="right-arm"
          className="hangman-part"
          x1="140"
          y1="100"
          x2="160"
          y2="130"
          stroke="black"
          strokeWidth="3"
          style={{ display: incorrectGuesses >= 4 ? "block" : "none" }} // Show right arm on fourth wrong guess
        />
        {/* Left Leg: Appears after right arm */}
        <line
          id="left-leg"
          className="hangman-part"
          x1="140"
          y1="150"
          x2="120"
          y2="190"
          stroke="black"
          strokeWidth="3"
          style={{ display: incorrectGuesses >= 5 ? "block" : "none" }} // Show left leg on fifth wrong guess
        />
        {/* Right Leg: Appears after left leg */}
        <line
          id="right-leg"
          className="hangman-part"
          x1="140"
          y1="150"
          x2="160"
          y2="190"
          stroke="black"
          strokeWidth="3"
          style={{ display: incorrectGuesses >= 6 ? "block" : "none" }} // Show right leg on sixth wrong guess
        />
      </svg>
    </div>
  );
}

export default HangmanBoard;
