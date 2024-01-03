import { Routes as Router, Route, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { useContext } from "react";
import { Landing } from "./pages/Landing";
import Claims from "./pages/Claims";

const PrivateRoutes = () => {
  const { Authenticated } = useContext(AuthContext);

  if (!Authenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home />} />
        <Route path="/claims" element={<Claims />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Router>
  );
};
