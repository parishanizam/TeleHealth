import React from "react";

function ClinicianLogin() {
  const [formData, setFormData] = React.useState({
    username: "",
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <h1 className="text-4xl font-normal leading-snug text-center mb-5">
        Clinician Login
      </h1>

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

      <div className="text-center mb-5">
        Message IT for help logging in
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

export default ClinicianLogin;
