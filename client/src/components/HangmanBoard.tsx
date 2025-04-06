function HangmanBoard() {
  return (
    <div id="hangman-container">
    <svg id="hangman-svg" width="200" height="250" viewBox="0 0 200 250">
      {/* <!-- Gallows bottom bar --> */}
      <line
        x1="20"
        y1="220"
        x2="100"
        y2="220"
        stroke="black"
        stroke-width="5"
      />
      {/* <!-- Tall bar --> */}
      <line
        x1="60"
        y1="220"
        x2="60"
        y2="20"
        stroke="black"
        stroke-width="5"
      />
      {/* <!-- top short bar  --> */}
      <line
        x1="60"
        y1="20"
        x2="140"
        y2="20"
        stroke="black"
        stroke-width="5"
      />
      {/* <!-- drop down bar for the hanging part --> */}
      <line
        x1="140"
        y1="20"
        x2="140"
        y2="50"
        stroke="black"
        stroke-width="5"
      />
      {/* <!-- Hanging rope --> */}
      {/* <!-- Hangman Parts (Hidden until wrong letters are selected) --> */}
      <circle
        id="head"
        className="hangman-part"
        cx="140"
        cy="70"
        r="20"
        stroke="black"
        stroke-width="3"
        fill="none"
        style={{"display": "none"}}
      />
      <line
        id="body"
        className="hangman-part"
        x1="140"
        y1="90"
        x2="140"
        y2="150"
        stroke="black"
        stroke-width="3"
        style={{"display": "none"}}
      />
      <line
        id="left-arm"
        className="hangman-part"
        x1="140"
        y1="100"
        x2="120"
        y2="130"
        stroke="black"
        stroke-width="3"
        style={{"display": "none"}}
      />
      <line
        id="right-arm"
        className="hangman-part"
        x1="140"
        y1="100"
        x2="160"
        y2="130"
        stroke="black"
        stroke-width="3"
        style={{"display": "none"}}
      />
      <line
        id="left-leg"
        className="hangman-part"
        x1="140"
        y1="150"
        x2="120"
        y2="190"
        stroke="black"
        stroke-width="3"
        style={{"display": "none"}}
      />
      <line
        id="right-leg"
        className="hangman-part"
        x1="140"
        y1="150"
        x2="160"
        y2="190"
        stroke="black"
        stroke-width="3"
        style={{"display": "none"}}
      />
    </svg>
  </div>
  );
}

export default HangmanBoard;