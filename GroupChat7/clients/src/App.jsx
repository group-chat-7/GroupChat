import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { useAuthContext } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import VideoCallRoom from "./components/videocall/VideoCallRoom";
import VideoCallButton from "./components/videocall/VideoCallButton";

function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <div>
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to={"/login"} />}
          />

          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />

          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <SignUp />}
          />

          <Route
            path="/room"
            element={<VideoCallButton />}
          />

          <Route
            path="/room/:roomId"
            element={<VideoCallRoom />}
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
