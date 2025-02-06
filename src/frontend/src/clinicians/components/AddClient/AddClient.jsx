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
      setError("Please fill out both first and last names before generating a client number.");
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
        }
      );

      dispatch(
        addClient({
          clientId: response.data.clientId,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          securityCode: response.data.securityCode,
        })
      );

      setSuccessMessage("Client added successfully!");
    } catch (err) {
      console.error("Error adding client:", err);
      setError("Failed to add client. Please try again.");
      setIsGenerateDisabled(false); 
    }
  };

  return (
    <form className="flex flex-col items-center space-y-5">
      <h2 className="text-2xl font-semibold">Add New Client</h2>

      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

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

      <GenerateButton
        onClick={generateAndSubmitClientNumber}
        disabled={isGenerateDisabled}
        buttonText={isGenerateDisabled ? "Client Number Generated" : "Generate & Submit"}
      />

      {clientNumber && (
        <p className="mt-4 text-lg text-gray-700 font-bold">
          Client Number: {clientNumber}
        </p>
      )}
    </form>
  );
}

export default AddClient;
