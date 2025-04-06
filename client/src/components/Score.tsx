function Score () {
    const resetGame = () => {
        console.log("Game reset!");
    };

    return (
        <div>
            <div id="score-container" className="score-container">
                <p>Wins: <span id="wins-count">0</span></p>
                <p>Streak: <span id="streak-count">0</span></p>
            </div>
            <div id="difficulty-container" className="difficulty-container">
                <button className="difficulty-btn" data-diff="easy">Easy</button>
                <button className="difficulty-btn" data-diff="normal">Normal</button>
                <button className="difficulty-btn" data-diff="hard">Hard</button>
            </div>
            <div id="game-over-message" className="game-over-message" style={{"display": "none"}}>
                <h2>Game Over!</h2>
                <p>Your streak is now reset.</p>
                <button onClick={resetGame}>Try Again</button>
            </div>
        </div>
    );
}

export default Score;