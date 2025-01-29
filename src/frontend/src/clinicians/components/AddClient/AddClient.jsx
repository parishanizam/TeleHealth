import React from "react";
import GenerateButton from "./GenerateButton";
import InputField from "./InputField";

function AddClient() {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: ""
  });

  const [clientNumber, setClientNumber] = React.useState(""); // New state for client number

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
  };

  const generateClientNumber = () => {
    setClientNumber("QD4X2P"); // Set the generated client number
  };

  return (
    <form onSubmit={handleSubmit}
          className="flex flex-col items-center "
          style={{ minHeight: "300px" }}  // Reserve space for the client number text
    >

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

    {/* Display the generated client number */}
    {clientNumber && <p className="mt-4 text-lg text-gray-700 font-bold">Client Number: {clientNumber}</p>}

    </form>
  );
}

export default AddClient;
