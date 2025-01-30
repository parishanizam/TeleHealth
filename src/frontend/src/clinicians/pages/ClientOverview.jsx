import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Graph from "../components/ClientOverview/Graph";
import { Results } from "../components/ClientOverview/Results";
import { Header } from "../components/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ClientOverview() {
  const { clientId } = useParams(); 
  const location = useLocation();
  const client = location.state?.client; 

  // Fallback message if client data is missing
  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-red-500 text-2xl font-bold">Error: No client data found.</h1>
        <p className="text-gray-600">Try navigating from the Clinician Dashboard.</p>
      </div>
    );
  }

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const filterOptions = ["English", "Mandarin", "Matching", "Repetition", "Date"];

  const handleFilterChange = (e) => {
    const { value } = e.target;

    if (value === "Date" && !selectedFilters.includes("Date")) {
      setSelectedFilters([...selectedFilters, value]);
    } else if (selectedFilters.includes(value)) {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== value));
      if (value === "Date") setSelectedDate(null);
    } else if (selectedFilters.length < 5) {
      setSelectedFilters([...selectedFilters, value]);
    } else {
      alert("You can select up to 5 filters.");
    }
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    setSelectedDate(null);
  };

  return (
    <div className="flex flex-col px-5 pt-2.5 pb-80 bg-white max-md:pb-24">
      {/* Header */}
      <Header title={`${client.firstName} ${client.lastName} - Overview`} />

      {/* Client Details */}
      <div className="p-4 space-y-4">
        <h2 className="text-lg font-semibold">Client Details</h2>
        <p className="text-lg">Security Code: {client.securityCode}</p>
      </div>

      {/* Filter Section */}
      <div className="p-4 space-y-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <div className="flex flex-col space-y-2">
          <label className="font-medium">Select a Filter:</label>
          <div className="flex gap-4 items-center">
            <select className="border p-2 rounded-md" onChange={handleFilterChange} value="">
              <option value="" disabled>
                Select a filter
              </option>
              {filterOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            {selectedFilters.length > 0 && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Clear Filters
              </button>
            )}
          </div>

          <div className="min-h-[40px]">
            {selectedFilters.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedFilters.map((filter, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
                    {filter}
                  </span>
                ))}
              </div>
            )}
          </div>

          {selectedFilters.includes("Date") && (
            <div>
              <label className="font-medium">Select a Date:</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="border p-2 rounded-md w-full"
                placeholderText="Choose a date"
              />
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <div className="flex-grow p-4 text-center">
          <h2 className="text-lg font-semibold mb-4">Graph</h2>
          <Graph filters={selectedFilters} selectedDate={selectedDate} />
        </div>

        <div className="flex-grow p-4 text-start">
          <h2 className="text-lg font-semibold mb-4">Results</h2>
          <Results filters={selectedFilters} selectedDate={selectedDate} />
        </div>
      </div>
    </div>
  );
}

export default ClientOverview;
