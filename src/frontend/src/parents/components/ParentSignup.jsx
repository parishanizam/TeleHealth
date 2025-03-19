import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ParentSignUp() {
  const [formData, setFormData] = React.useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    securityCode: "",
  });
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Call the parent signup endpoint
      const response = await axios.post("http://localhost:3000/auth/parents/signup", {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        securityCode: formData.securityCode,
      });

      console.log("Parent Signup Success:", response.data);

      localStorage.setItem('parentUsername', response.data.user.username);
      navigate("/parents/parentaccountconfirmation");
    } catch (err) {
      console.error("Parent Signup Error:", err);
      setError(err.response?.data?.error || "Signup failed.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <h1 className="text-4xl font-normal leading-snug text-center mb-4">
          Welcome
        </h1>
        {error && (
          <div className="text-red-500 text-center mb-3">
            {error}
          </div>
        )}

        {/* Email Input */}
        <div className="w-[438px] mb-4">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="px-6 py-3 w-full rounded-2xl border border-solid border-zinc-300"
          />
        </div>

        {/* Username Input */}
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

        {/* Password Input */}
        <div className="w-[438px] mb-4">
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

        {/* Confirm Password Input */}
        <div className="w-[438px] mb-4">
          <label htmlFor="confirmPassword" className="sr-only">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Re-enter Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="px-6 py-3 w-full rounded-2xl border border-solid border-zinc-300"
          />
        </div>

        {/* Security Code Input */}
        <div className="w-[438px] mb-4">
          <label htmlFor="securityCode" className="sr-only">
            Security Code
          </label>
          <input
            id="securityCode"
            name="securityCode"
            type="text"
            placeholder="Security Code"
            value={formData.securityCode}
            onChange={handleChange}
            className="px-6 py-3 w-full rounded-2xl border border-solid border-zinc-300"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2.5 text-xl leading-none text-white bg-slate-900 rounded-lg shadow-sm w-[433px] hover:opacity-80 active:opacity-100 text-center"
          aria-label="Next button"
        >
          Next
        </button>
      </form>
    </div>
  );
}

export default ParentSignUp;
