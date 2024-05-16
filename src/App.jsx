import "./App.css";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import Player from "./Pages/Player/Player";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:movieId" element={<Player />} />
      </Routes>
    </>
  );
}

export default App;
