import Hero from "./components/Hero";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Signup from "./components/Signup";
import Login from "./components/Login";
import { Gallery } from "./components/Gallery";
import AdminLogin from "./admin/Adminlogin";
import AdminSignup from "./admin/AdminSignup";
import Announcement from "./components/Announcement";
import Profile from "./components/Profile";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

//pack
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./admin/Dashboard";

import IndigencyForm from "./components/IndigencyForm";
import ClearanceForm from "./components/ClearanceForm";

function App() {
  return (
    <>
      <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Hero />}></Route>

          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminsignup" element={<AdminSignup />} />
          <Route path="/announcement" element={<Announcement />} />
          <Route path="/indigency" element={<IndigencyForm />} />
          <Route path="/clearance" element={<ClearanceForm />} />

          <Route path="/about" element={<About />} />

          {/*<Route
            path="/dashboard"
            element={
              <PrivateRoute requiredRole="admin">
                <Dashboard />
              </PrivateRoute>
            }
          />
          */}
        </Routes>
      </BrowserRouter>

      <Gallery />
      <About />

      <Footer />
    </>
  );
}

export default App;
