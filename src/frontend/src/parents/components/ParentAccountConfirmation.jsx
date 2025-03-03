import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ParentAccountConfirmation() {
  const [isChecked, setIsChecked] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [overrideFirstName, setOverrideFirstName] = useState("");
  const [overrideLastName, setOverrideLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const parentUsername = localStorage.getItem("parentUsername");

  useEffect(() => {
    // On component mount, fetch parent's existing data
    const fetchParentData = async () => {
      if (!parentUsername) {
        setError("No parent username found.");
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(
          `https://telehealth-insights.onrender.com/auth/parents/account-details/${parentUsername}`
        );
        const data = res.data.data;
        if (data) {
          setFirstName(data.firstName || "");
          setLastName(data.lastName || "");
        } else {
          setError("No data found for this parent.");
        }
      } catch (err) {
        console.error("Failed to fetch parent details:", err);
        setError("Could not load parent details.");
      } finally {
        setLoading(false);
      }
    };

    fetchParentData();
  }, [parentUsername]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isChecked) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    if (!parentUsername) {
      setError("No parent username in localStorage.");
      return;
    }

    try {
      const response = await axios.post(
        "https://telehealth-insights.onrender.com/auth/parents/confirm-account",
        {
          username: parentUsername,
          newFirstName: overrideFirstName,
          newLastName: overrideLastName,
        }
      );

      console.log("Confirm account response:", response.data);
      navigate("/parents/login");
    } catch (err) {
      console.error("Error confirming account:", err);
      setError(err.response?.data?.error || "Error confirming account.");
    }
  };

  if (loading) {
    return <div className="py-56 text-center">Loading account details...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center px-5 py-56 text-2xl text-black bg-white max-md:py-24"
    >
      <h1 className="text-4xl tracking-tight leading-snug text-center max-md:max-w-full">
        Account Confirmation
      </h1>

      {error && <div className="text-red-500 mt-3 text-center">{error}</div>}

      <p className="mt-5 leading-8 text-center text-zinc-950 w-[632px] max-md:max-w-full">
        Enter your child&apos;s preferred name
      </p>

      <div className="flex flex-col mt-5 max-w-full w-[438px]">
        <input
          type="text"
          value={overrideFirstName || firstName}
          onChange={(e) => setOverrideFirstName(e.target.value)}
          className="px-5 py-4 text-xl text-center tracking-tight whitespace-nowrap rounded-2xl border border-solid border-zinc-300 max-md:max-w-full"
          aria-label="First Name"
        />
      </div>

      <div className="flex flex-col mt-5 max-w-full w-[438px]">
        <input
          type="text"
          value={overrideLastName || lastName}
          onChange={(e) => setOverrideLastName(e.target.value)}
          className="px-5 py-4 text-xl text-center tracking-tight whitespace-nowrap rounded-2xl border border-solid border-zinc-300 max-md:max-w-full"
          aria-label="Last Name"
        />
      </div>

      <div className="flex flex-wrap gap-2 items-center mt-5 text-xl max-md:max-w-full">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="w-5 h-5 border border-black border-solid"
            aria-label="Accept terms and conditions"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span className="ml-2">
            I agree to the terms and conditions outlined by TeleHealth Insights
            Client Agreement
          </span>
        </label>
      </div>

      <button
        type="submit"
        className={`px-4 py-2.5 text-xl leading-none text-white rounded-lg shadow-sm w-[442px] ${
          isChecked ? "bg-slate-900 hover:opacity-80" : "bg-gray-400"
        } mt-8`}
        disabled={!isChecked}
      >
        Create Account
      </button>
    </form>
  );
}

export default ParentAccountConfirmation;
