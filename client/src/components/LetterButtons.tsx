function LetterButtons () {
    return (
        <>
            <h1 className="game-header">Riddle Hangman</h1>
            <div id="riddle-display" className="riddle-display">Loading riddle...</div>
            {/* <!-- Smaller Riddle Text --> */}

            <div id="word-display" className="word-display">_ _ _ _</div>
            {/* <!-- Large Word Display --> */}

            <div id="letters-container" className="letters-container"></div>
            {/* <!-- Letter Selection --> */}
        </>
    );
}

export default LetterButtons;