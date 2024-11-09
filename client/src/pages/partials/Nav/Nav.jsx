import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../../../components/Button";
import { useAuth } from "../../../context/AuthContext";
import { LuUserCircle2 } from "react-icons/lu";
import { BiCart } from "react-icons/bi";
import axios from "axios";

const getLinkClass = (isActive) =>
  isActive ? "text-slate-700" : "hover:text-slate-700";

const Nav = () => {
  const { user, loading, logout } = useAuth();

  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const [cart, setCart] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${API_URL}/cart/${user.id}`);
      setCart(response.data.products);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (user?.id && !loading) {
      fetchCart();
    }
  }, [user, loading]);

  if (loading) {
    return <nav className="w-full bg-cyan-500 h-20"></nav>;
  }

  return (
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
              className="cursor-pointer relative group"
              onMouseEnter={() => setShowCart(true)}
              onMouseLeave={() => setShowCart(false)}
            >
              <div className="group-hover:opacity-75">
                <BiCart size={34} />
              </div>

              {cart.length > 0 ? (
                <div className="absolute w-5 h-5 bg-red-400 flex justify-center items-center text-xs text-white rounded-full -top-1 -right-2 group-hover:opacity-75">
                  {cart.length}
                </div>
              ) : null}

              <div
                className={`bg-white text-black absolute top-[100%] left-1/2 transform -translate-x-1/2 text-base p-2 rounded-md w-52 max-h-96 flex flex-col items-center gap-1 shadow-lg transition-opacity duration-300 overflow-scroll ${
                  showCart ? "opacity-100" : "opacity-0 pointer-events-none"
                } ${!user && "hidden"}`}
              >
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex w-full min-h-28 rounded-md bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="min-w-16 flex-[1]">
                      <img
                        className="w-full h-full object-cover"
                        src={`${API_URL}/uploads/${item.productId.image}`}
                      />
                    </div>
                    <div className="flex-[2] flex flex-col justify-evenly p-1">
                      <h3 key={index} className="font-bold text-xs">
                        {item.productId.name}
                      </h3>
                      <p className="text-xs text-orange-700">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
                <Button
                  variant="primary"
                  className="my-2 w-full py-2 rounded-sm"
                >
                  Go to Cart
                </Button>
              </div>
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Nav;