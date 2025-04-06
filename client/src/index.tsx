import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Hangman from "./pages/Hangman/Hangman"; // Example component

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="hangman" element={<Hangman />} />
      </Route>
    </Routes>
  </Router>
);
