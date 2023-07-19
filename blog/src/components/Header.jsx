import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ImBlogger2 } from "react-icons/im";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black">
      <header className="header">
        <div
          className={`main-nav ${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:items-center`}
        >
          <a href="#" className="text-white">
            Home
          </a>
        </div>
        <button
          className="burger-menu md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <ul
          className={`main-nav ${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:items-center`}
        >
          <li>
            <a href="#" className="text-white">
              About
            </a>
          </li>
          <li>
            <a href="#" className="text-white">
              Sign-in
            </a>
          </li>
          <li>
            <a href="#" className="text-white">
              Register
            </a>
          </li>
          <li>
            <a href="#" className="text-white">
              Contact
            </a>
          </li>
        </ul>
      </header>
    </nav>
  );
};

export default Header;
