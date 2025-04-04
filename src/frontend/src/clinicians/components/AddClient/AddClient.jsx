/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 17, 2025
 * Purpose: Add Client button to be added to AddClient page
 */

import { useState } from "react";
import axios from "axios";
import GenerateButton from "./GenerateButton";
import InputField from "./InputField";
import { useSelector, useDispatch } from "react-redux";
import { addClient } from "../../../redux/clinicianSlice";

function AddClient() {
  const [formData, setFormData] = useState({ firstName: "", lastName: "" });
  const [clientNumber, setClientNumber] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isGenerateDisabled, setIsGenerateDisabled] = useState(false);
  const dispatch = useDispatch();

  const clinicianInfo = useSelector((state) => state.clinician.clinicianInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateAndSubmitClientNumber = async () => {
    if (!formData.firstName || !formData.lastName) {
      setError(
        "Please fill out both first and last names before generating a client number.",
      );
      return;
    }

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setClientNumber(result);
    setError("");
    setIsGenerateDisabled(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/clinicians/add-client",
        {
          clinicianUsername: clinicianInfo.username,
          firstName: formData.firstName,
          lastName: formData.lastName,
          securityCode: result,
        },
      );

      dispatch(
        addClient({
          clientId: response.data.clientId,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          securityCode: response.data.securityCode,
        }),
      );

      setSuccessMessage("Client added successfully!");
    } catch (err) {
      console.error("Error adding client:", err);
      setError("Failed to add client. Please try again.");
      setIsGenerateDisabled(false);
    }
  };

  return (
    <div className="mt-40">
      <form className="flex flex-col items-center space-y-1">
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <div>
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
        </div>

        <GenerateButton
          onClick={generateAndSubmitClientNumber}
          disabled={isGenerateDisabled}
          buttonText={
            isGenerateDisabled ? "Client Number Generated" : "Generate & Submit"
          }
        />

        {clientNumber && (
          <p className="mt-4 text-lg text-gray-700 font-bold flex items-center">
            Security Code (Client Number): {clientNumber}
            <div className="group ml-2 relative">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border border-red-500 text-red-500 cursor-pointer">
                <span className="font-bold text-xs">i</span>
              </div>
              <div className="hidden group-hover:block absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm p-2 rounded shadow-md w-80">
                This client number is auto-generated.
                <br />
                Please note this code and provide it to the client to create an
                account.
              </div>
            </div>
          </p>
        )}
      </form>
    </div>
  );
}

export default AddClient;
