import React from "react";

function ParentSignUp() {
  const [formData, setFormData] = React.useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    securityCode: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add sign-up logic here
    console.log("Submitted data:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <h1 className="text-4xl font-normal leading-snug text-center mb-5">
          Parent Sign Up
        </h1>

        {/* Email Input */}
        <div className="w-[438px] mb-5">
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
        <div className="w-[438px] mb-5">
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
        <div className="w-[438px] mb-5">
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
        <div className="w-[438px] mb-5">
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
        <div className="w-[438px] mb-5">
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
          className="px-4 py-2.5 text-xl leading-none text-white bg-slate-900 rounded-lg shadow-sm w-[433px] hover:opacity-80 active:opacity-100"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default ParentSignUp;
