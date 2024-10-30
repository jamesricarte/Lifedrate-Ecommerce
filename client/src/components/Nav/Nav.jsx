import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../partials/Button";
import { useAuth } from "../../context/AuthContext";
import { LuUserCircle2 } from "react-icons/lu";
import { BiCart } from "react-icons/bi";

const getLinkClass = (isActive) =>
  isActive ? "text-slate-700" : "hover:text-slate-700";

const Nav = () => {
  const { user, logout } = useAuth();

  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setshowCart] = useState(false);

  return (
    <>
      <nav className="flex justify-center items-center w-full bg-cyan-500 h-20 text-xl text-white">
        <ul className="flex justify-between items-center w-[80%]">
          <div className="flex items-center">
            <NavLink
              to="/"
              className="text-3xl font-semibold cursor-pointer hover:text-slate-700"
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

            <div
              className="flex gap-4 items-center relative"
              onMouseEnter={() => setShowMenu(true)}
              onMouseLeave={() => setShowMenu(false)}
            >
              {user ? (
                <>
                  <div className="flex items-center gap-2 cursor-pointer hover:opacity-75 rounded-md p-2">
                    <span className="text-base">
                      {user.name.split(" ")[0].charAt(0).toUpperCase() +
                        user.name.split(" ")[0].slice(1)}
                    </span>

                    <LuUserCircle2 size={28} />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-4">
                    <NavLink to="/login">
                      <Button variant="primary">Log in</Button>
                    </NavLink>
                    <NavLink to="/register">
                      <Button variant="secondary">Sign Up</Button>
                    </NavLink>
                  </div>
                </>
              )}

              <div
                className={`bg-white text-black absolute top-[100%] left-1/2 transform -translate-x-1/2 text-base p-2 rounded-md w-36 flex flex-col items-center gap-1 shadow-lg transition-opacity duration-300 ${
                  showMenu ? "opacity-100" : "opacity-0 pointer-events-none"
                } ${!user && "hidden"}`}
              >
                <div className="w-full text-center cursor-pointer hover:bg-gray-100 p-1 rounded-md">
                  My Account
                </div>
                <div className="w-full text-center cursor-pointer hover:bg-gray-100 p-1 rounded-md">
                  My Purchase
                </div>
                <div className="p-2">
                  <Button variant="primary" onClick={logout}>
                    Logout
                  </Button>
                </div>
              </div>
            </div>

            {user && (
              <div
                className="cursor-pointer relative"
                onMouseEnter={() => setshowCart(true)}
                onMouseLeave={() => setshowCart(false)}
              >
                <div className="hover:opacity-75">
                  <BiCart size={34} />
                </div>

                <div
                  className={`bg-white text-black absolute top-[100%] left-1/2 transform -translate-x-1/2 text-base p-2 rounded-md w-40 h-96 flex flex-col items-center gap-1 shadow-lg transition-opacity duration-300 ${
                    showCart ? "opacity-100" : "opacity-0 pointer-events-none"
                  } ${!user && "hidden"}`}
                >
                  <div className="h-full flex justify-center items-center">
                    <p className="font-bold text-sm">Carts Shows Here</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
