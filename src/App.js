import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import SavedFilm from "./components/savedFilm/SavedFilm";
import Watchlist from "./components/Watchlist";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Main />}></Route>
        <Route exact path="/saved-films" element={<SavedFilm />}></Route>
        <Route exact path="/watchlist" element={<Watchlist />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
