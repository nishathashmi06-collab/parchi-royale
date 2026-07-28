import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CreateRoom from "./pages/CreateRoom";
import JoinRoom from "./pages/JoinRoom";
import Lobby from "./pages/Lobby";
import RoleScreen from "./pages/RoleScreen";
import PickCard from "./pages/PickCard";
import Game from "./pages/Game";
import Winner from "./pages/Winner";
import Reveal from "./pages/Reveal";
import RoyalHall from "./pages/RoyalHall";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Home />} />

        <Route path="/create-room" element={<CreateRoom />} />

        <Route path="/join-room" element={<JoinRoom />} />

        <Route path="/lobby" element={<Lobby />} />

        <Route path="/role" element={<RoleScreen />} />

        <Route path="/pick-card" element={<PickCard />} />

        <Route path="/game" element={<Game />} />

        <Route path="/winner" element={<Winner />} />

        <Route path="/reveal" element={<Reveal />} />

        <Route path="/royal-hall" element={<RoyalHall />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;