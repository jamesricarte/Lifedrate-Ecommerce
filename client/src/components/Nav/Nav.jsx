import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../partials/Button";
import { useAuth } from "../../context/AuthContext";

const getLinkClass = (isActive) =>
  isActive ? "text-gray-700 underline" : "hover:underline hover:text-gray-700";

const Nav = () => {
  const { user, logout } = useAuth();
  return (
    <>
      <nav className="flex justify-center items-center w-full bg-cyan-500 h-20 text-xl text-white">
        <ul className="flex justify-between items-center w-[80%]">
          <div className="flex items-center">
            <NavLink
              to="/"
              className="text-3xl font-semibold cursor-pointer hover:underline hover:text-gray-700"
            >
              Logo
            </NavLink>
          </div>

          <div className="flex w-[31vw] justify-between items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `cursor-pointer ${getLinkClass(isActive)}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `cursor-pointer ${getLinkClass(isActive)}`
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `cursor-pointer ${getLinkClass(isActive)}`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `cursor-pointer ${getLinkClass(isActive)}`
              }
            >
              Contact
            </NavLink>

            <div className="flex gap-4 items-center">
              {user ? (
                <div className="flex items-center gap-3">
                  <span>{user.name}</span>
                  <NavLink>
                    <Button variant="secondary">Account</Button>
                  </NavLink>
                  <NavLink to="/login">
                    <Button variant="primary" onClick={logout}>
                      Logout
                    </Button>
                  </NavLink>
                </div>
              ) : (
                <>
                  <NavLink to="/login">
                    <Button variant="primary">Log in</Button>
                  </NavLink>
                  <NavLink to="/register">
                    <Button variant="secondary">Sign Up</Button>
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
