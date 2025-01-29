import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GenerateButton from "./GenerateButton";
import InputField from "./InputField";
import { useSelector, useDispatch } from "react-redux";
import { addClient } from "../../../redux/clinicianSlice";

function AddClient() {
  const [formData, setFormData] = useState({ firstName: "", lastName: "" });
  const [clientNumber, setClientNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get clinician info from Redux
  const clinicianInfo = useSelector((state) => state.clinician.clinicianInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Generate a 6-character alphanumeric client number
  const generateClientNumber = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setClientNumber(result);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !clientNumber) {
      setError("Please fill all fields and generate a client number.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/auth/clinicians/add-client", {
        clinicianUsername: clinicianInfo.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        clientNumber: clientNumber,
      });

      console.log("Client Added Successfully:", response.data);

      // Dispatch new client to Redux
      dispatch(addClient({ name: `${formData.firstName} ${formData.lastName}` }));

      // Navigate back to dashboard
      navigate("/clinicians/ClinicianDashboard");
    } catch (err) {
      console.error("Error adding client:", err);
      setError("Failed to add client. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-5">
      <h2 className="text-2xl font-semibold">Add New Client</h2>

      {error && <p className="text-red-500">{error}</p>}

      <InputField
        id="firstName"
        name="firstName"
        type="text"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
      />

      <InputField
        id="lastName"
        name="lastName"
        type="text"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
      />

      <GenerateButton onClick={generateClientNumber} />

      {/* Display generated client number */}
      {clientNumber && (
        <p className="mt-4 text-lg text-gray-700 font-bold">
          Client Number: {clientNumber}
        </p>
      )}

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Submit
      </button>
    </form>
  );
}

export default AddClient;
