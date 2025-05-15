import { Routes, Route } from "react-router-dom";
import Vault from "./pages/Vault.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Account from "./pages/Account.jsx";
import Navbar from "./components/Navbar.jsx";

export default function App() {
  const hideNavbar = ["/login", "/register"];
  return (
    <main>
      {/*
      {!hideNavbar.includes(location.pathname) && <Navbar />}
      */}
      <Routes>
        <Route path="/" element={<Vault />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </main>
  );
}
