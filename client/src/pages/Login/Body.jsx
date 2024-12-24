import React, { useState, useRef } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

const Body = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const passwordRef = useRef(null);

  const [message, setMessage] = useState(null);
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const { login } = useAuth();

  const authenticateUser = async (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;

    if (!email || !password) return;

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      login(response.data.user);
      setMessage({ text: response.data.message, type: "success" });
      setIsMessageVisible(true);

      setEmail("");
      passwordRef.current.value = "";

      document.getElementById("email").focus;

      setTimeout(() => setIsMessageVisible(false), 3000);
      navigate("/products");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;

      setMessage({ text: errorMessage, type: "error" });
      setIsMessageVisible(true);

      setTimeout(() => setIsMessageVisible(false), 3000);
    }
  };

  return (
    <>
      <main className="h-[80vh] flex flex-col items-center justify-center">
        <div
          className={`fixed top-0 left-1/2 -translate-x-1/2 py-1.5 px-2.5 rounded-md text-white z-50 opacity-0 pointer-events-none transition-all duration-[.6s] ease-[ease] ${
            isMessageVisible ? "opacity-100 top-[10%] pointer-events-auto" : ""
          } ${message?.type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
          {message?.text}
        </div>

        <form
          className="flex flex-col items-center gap-2 p-16 w-[400px] border rounded-lg text-gray-700"
          onSubmit={authenticateUser}
        >
          <h3 className="mb-5 text-2xl font-semibold">Please Login</h3>
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="mb-1">
              Email
            </label>
            <Input
              type="email"
              placeholder="Enter your Email"
              id="email"
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="password" className="mb-1">
              Password
            </label>
            <Input
              type="password"
              placeholder="Enter your Password"
              id="password"
              required={true}
              ref={passwordRef}
            ></Input>
          </div>
          <Button className="w-32 mt-3" type="submit" variant="primary">
            Log in
          </Button>
          <p>
            Dont have an account?{" "}
            <Link className="text-cyan-700 opacity-60" to="/register">
              Sign up Now
            </Link>
          </p>
        </form>
      </main>
    </>
  );
};

export default Body;
