import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import SavedFilm from "./components/SavedFilm";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Main />}></Route>
        <Route exact path="/saved-film" element={<SavedFilm />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
