import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <header>
        <h1>Riddle Hangman</h1>
        <nav>
          <ul>
            <li>
              <Link to="/hangman">Play Hangman</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
