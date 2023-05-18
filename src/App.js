import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Profile from "./components/profile/Profile";
import TrackedFilm from "./components/trackedFilm/TrackedFilm";
import Watchlist from "./components/watchlist/Watchlist";
import Film from "./components/film/Film";
import Welcome from "./components/welcome/Welcome";
import "./App.css";

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Main />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
        <Route exact path="/tracked" element={<TrackedFilm />}></Route>
        <Route exact path="/watchlist" element={<Watchlist />}></Route>
        <Route exact path="/film/:id" element={<Film />}></Route>
        <Route exact path="/welcome" element={<Welcome />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
