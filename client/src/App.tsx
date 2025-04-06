import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <header>
        <h1 className="app-title">Riddle Hangman</h1>
        <nav className="navbar">
          <Link to="/hangman" className="nav-link">Play Hangman</Link>
          <Link to="/register" className="nav-link">Register</Link>
          <Link to="/login" className="nav-link">Login</Link>
        </nav>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default App;