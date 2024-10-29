import React, { useState, useRef } from "react";
import Button from "../../partials/Button";
import Input from "../../partials/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./../../../modal.css";
import { useAuth } from "../../../context/AuthContext";

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
          className={`message ${isMessageVisible ? "active" : ""} ${
            message?.type === "success" ? "bg-success" : "bg-error"
          }`}
        >
          {message?.text}
        </div>

        <form
          className="flex flex-col items-center gap-2 p-16 w-[20vw] border rounded-lg text-gray-700"
          onSubmit={authenticateUser}
        >
          <h3 className="text-2xl font-semibold mb-5">Please Login</h3>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1">
              Email
            </label>
            <Input
              placeholder="Enter your Email"
              id="email"
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
          </div>

          <div className="flex flex-col">
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
          <Button className="mt-3 w-32" type="submit" variant="primary">
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
