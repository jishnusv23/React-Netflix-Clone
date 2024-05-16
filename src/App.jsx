import "./App.css";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import Player from "./Pages/Player/Player";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("user logged In");
        navigate("/");
      } else {
        console.log("user logged out ");
        navigate("/login");
      }
    });
  }, []);

  return (
    <>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:movieId" element={<Player />} />
      </Routes>
    </>
  );
}

export default App;
