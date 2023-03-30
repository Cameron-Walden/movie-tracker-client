import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import SavedFilm from "./components/savedFilm/SavedFilm";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Main />}></Route>
        <Route exact path="/saved-film" element={<SavedFilm />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
