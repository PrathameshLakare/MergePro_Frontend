import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EditProfile from "./pages/EditProfile";
import UserProfiles from "./pages/UserProfiles";
import ProfileDetails from "./pages/ProfileDetails";

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/";

  return (
    <div className="d-flex flex-column min-vh-100">
      {!isAuthPage && <Navbar />}
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profiles" element={<UserProfiles />} />
          <Route path="/edit/profile" element={<EditProfile />} />
          <Route path="/profile-details/:userId" element={<ProfileDetails />} />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;
