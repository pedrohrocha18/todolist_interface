import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "./authStore.js";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  return (
    <nav className="bg-purple-900 flex justify-around p-4 items-center w-[100%]">
      <div className="text-white text-lg font-bold flex gap-3 items-center">
        <img src="./assets/to-do-list.png" alt="logo" className="h-10" />
        <p>To-do</p>
      </div>
      <button
        className="lg:hidden flex flex-col items-center justify-center w-8 h-8 relative z-20"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        <div
          className={`h-1 w-6 bg-white transition-all duration-300 transform mb-1 ${
            menuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <div
          className={`h-1 w-6 bg-white transition-all duration-300 mb-1 ${
            menuOpen ? "opacity-0" : ""
          }`}
        />
        <div
          className={`h-1 w-6 bg-white transition-all duration-300 transform ${
            menuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>
      <div
        className={`flex flex-col items-center lg:flex-row lg:items-center lg:static lg:opacity-100 lg:translate-x-0 absolute top-0 left-0 w-full h-screen bg-purple-900 lg:w-auto lg:h-auto transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <a
          href="/"
          className="text-white text-lg py-2 px-4 hover:bg-blue-500 lg:hover:bg-transparent"
          onClick={closeMenu}
        >
          Home
        </a>
        {!isAuthenticated ? (
          <>
            <a
              href="/register"
              className="text-white text-lg py-2 px-4 hover:bg-blue-500 lg:hover:bg-transparent"
              onClick={closeMenu}
            >
              Criar Conta
            </a>
            <a
              href="/login"
              className="text-white text-lg py-2 px-4 hover:bg-blue-500 lg:hover:bg-transparent"
              onClick={closeMenu}
            >
              Login
            </a>
          </>
        ) : (
          <>
            <a
              href="/dashboard"
              className="text-white text-lg py-2 px-4 hover:bg-blue-500 lg:hover:bg-transparent"
              onClick={closeMenu}
            >
              Dashboard
            </a>
            <button
              className="text-white text-lg py-2 px-4 hover:bg-red-500 lg:hover:bg-transparent"
              onClick={handleLogout}
            >
              Sair
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
