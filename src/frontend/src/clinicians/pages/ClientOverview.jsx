import React, { useState } from "react";
import Graph from "../components/ClientOverview/Graph";
import { Results } from "../components/ClientOverview/Results";
import { Header } from "../components/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ClientOverview() {
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

  return (
    <div className="flex flex-col h-screen p-4 space-y-6 bg-gray-50">
      <Header title="Mitchell Weingust - Overview" />

      {/* Filter Section */}
      <div className="bg-white rounded-md shadow-md p-4 space-y-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <div className="flex flex-col space-y-2">
          <label className="font-medium">Select a Filter:</label>
          <select
            className="border p-2 rounded-md"
            onChange={handleFilterChange}
            value=""
          >
            <option value="" disabled>
              Select a filter
            </option>
            {filterOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          {/*"Date" Filter */}
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

      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        {/* Graph Section */}
        <div className="flex-grow bg-white rounded-md shadow-md p-4 text-center">
          <h2 className="text-lg font-semibold mb-4">Graph</h2>
          <Graph filters={selectedFilters} selectedDate={selectedDate} />
        </div>

        {/* Results Section */}
        <div className="flex-grow bg-white rounded-md shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Results</h2>
          <Results filters={selectedFilters} selectedDate={selectedDate} />
        </div>
      </div>
    </div>
  );
}

export default ClientOverview;
