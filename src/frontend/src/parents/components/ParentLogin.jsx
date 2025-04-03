/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 26, 2025
 * Purpose: Contains ParentLogin component to allow users with parent roles
 *          to access and login to their accounts. To be used on ParentLoginPage
 */

import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setParentInfo } from "../../redux/parentSlice";

function ParentLogin() {
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  });
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/parents/login",
        {
          username: formData.username,
          password: formData.password,
        },
      );

      const loggedUser = response.data?.user;
      const detailsResponse = await axios.get(
        `http://localhost:3000/auth/parents/account-details/${loggedUser.username}`,
      );

      const fullParentData = detailsResponse.data?.data;
      dispatch(setParentInfo(fullParentData));
      navigate("/parents/ParentHomePage");
    } catch (err) {
      console.error("Parent Login Error:", err);
      setError(err.response?.data?.error || "Login failed.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <h1 className="text-4xl font-normal leading-snug text-center mb-5">
        Parent Login
      </h1>
      {error && <div className="text-red-500 text-center mb-3">{error}</div>}
      <div className="w-[438px] mb-4">
        <label htmlFor="username" className="sr-only">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="px-6 py-3 w-full rounded-2xl border border-solid border-zinc-300"
        />
      </div>
      <div className="w-[438px] mb-3">
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="px-6 py-3 w-full rounded-2xl border border-solid border-zinc-300"
        />
      </div>
      <div className="text-center mb-5">
        <span>
          Don&apos;t have an account?{" "}
          <a
            href="/parents/signup"
            className="text-blue-600 hover:underline"
            aria-label="Sign up link"
          >
            Sign up
          </a>
        </span>
      </div>
      <button
        type="submit"
        className="px-4 py-2.5 text-xl leading-none text-white bg-slate-900 rounded-lg shadow-sm w-[433px] hover:opacity-80 active:opacity-100"
      >
        Login
      </button>
    </form>
  );
}

export default ParentLogin;
