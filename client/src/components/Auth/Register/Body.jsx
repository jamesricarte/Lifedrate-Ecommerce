import React from "react";
import Button from "../../partials/Button";
import Input from "../../partials/Input";
import { Link } from "react-router-dom";

const Body = () => {
  return (
    <>
      <main className="h-[80vh] flex flex-col items-center justify-center">
        <form
          className="flex flex-col items-center gap-2 p-16 w-[20vw] border rounded-lg text-gray-700"
          action=""
        >
          <h3 className="text-2xl font-semibold mb-5">Please Register</h3>

          <div className="flex flex-col">
            <label htmlFor="" className="mb-1" for="fullName">
              Full Name
            </label>
            <Input
              placeholder="Enter your Full Name"
              id="fullName"
              required="true"
            ></Input>
          </div>

          <div className="flex flex-col">
            <label htmlFor="" className="mb-1" for="email">
              Email
            </label>
            <Input
              placeholder="Enter your Email"
              id="email"
              required="true"
            ></Input>
          </div>

          <div className="flex flex-col">
            <label htmlFor="" className="mb-1" for="password">
              Password
            </label>
            <Input
              type="password"
              placeholder="Enter your Password"
              id="password"
              required="true"
            ></Input>
          </div>
          <Button className="mt-3 w-32" type="submit" variant="primary">
            Sign Up
          </Button>
          <p>
            Already have an account?{" "}
            <Link className="text-cyan-700 opacity-60" to="/login">
              Log In Now
            </Link>
          </p>
        </form>
      </main>
    </>
  );
};

export default Body;
