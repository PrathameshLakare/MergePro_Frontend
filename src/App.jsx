import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EditProfile from "./pages/EditProfile";
import UserProfiles from "./pages/UserProfiles";
import ProfileDetails from "./pages/ProfileDetails";
import Protected from "./components/Protected";

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/";

  return (
    <div className="d-flex flex-column min-vh-100">
      {!isAuthPage && <Navbar />}
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
          <Route
            path="/profiles"
            element={
              <Protected>
                <UserProfiles />
              </Protected>
            }
          />
          <Route
            path="/edit/profile"
            element={
              <Protected>
                <EditProfile />
              </Protected>
            }
          />
          <Route
            path="/profile-details/:userId"
            element={
              <Protected>
                <ProfileDetails />
              </Protected>
            }
          />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;
