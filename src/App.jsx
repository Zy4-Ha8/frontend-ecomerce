import Navbar from "./components/Navbar";
import Login from "./pages/Auth/Login";
import OTPVerification from "./pages/Auth/OTPVerification";
import Registion from "./pages/Auth/Registion";
import HomePage from "./pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Dashboard/users/Users";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registion" element={<Registion />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp-verify/:id" element={<OTPVerification />} />
          <Route path="/profile/" element={<Profile />} />

          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="users" element={<Users />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
