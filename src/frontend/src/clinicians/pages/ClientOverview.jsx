import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import Graph from "../components/ClientOverview/Graph";
import { Results } from "../components/ClientOverview/Results";
import { Header } from "../../parents/components/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ClientOverview() {
  const { clientId } = useParams();
  const location = useLocation();
  const client = location.state?.client;

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [assessmentHistory, setAssessmentHistory] = useState([]);

  useEffect(() => {
    if (client?.parentUsername) {
      fetchAssessmentHistory(client.parentUsername);
    }
  }, [client]);

  const fetchAssessmentHistory = async (username) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/resultstorage/assessment-history/${username}`
      );
      if (response.data && Array.isArray(response.data.assessments)) {
        setAssessmentHistory(response.data.assessments);
      } else {
        console.warn("No assessments found in the response.");
        setAssessmentHistory([]);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  // All possible filters
  const filterOptions = [
    "English",
    "Mandarin",
    "Matching",
    "Repetition",
    "Quantifier",
    "Date",
  ];

  // Add or remove a filter based on selection
  const handleFilterChange = (e) => {
    const { value } = e.target;

    // If "Date" is selected and not active yet, add it
    if (value === "Date" && !selectedFilters.includes("Date")) {
      setSelectedFilters((prev) => [...prev, value]);
      return;
    }

    // If the filter is already selected, remove it
    if (selectedFilters.includes(value)) {
      removeFilter(value);
      return;
    }

    // Otherwise, add the new filter
    setSelectedFilters((prev) => [...prev, value]);
  };

  // Remove a single filter (e.g. user clicks X on a pill)
  const removeFilter = (filter) => {
    setSelectedFilters((prev) => prev.filter((f) => f !== filter));
    if (filter === "Date") {
      setSelectedDate(null);
    }
  };

  // Clear them all
  const clearFilters = () => {
    setSelectedFilters([]);
    setSelectedDate(null);
  };

  return (
    <div className="flex flex-col min-h-screen px-5 pt-2.5 pb-6 bg-white overflow-y-auto">
      <Header
        title={`${client?.firstName} ${client?.lastName} - Overview`}
        role="clinician"
      />

      <div className="space-y-4 mt-3">
        <p className="text-lg">Security Code: {client?.securityCode}</p>
      </div>

      {/* Center a narrower container for the filter box */}
      <div className="w-full flex">
        <div className="p-4 space-y-4 bg-blue-50 border border-blue-200 rounded-md mt-6 max-w-sm w-full">
          {/* SELECT NEW FILTER */}
          <div className="flex flex-wrap gap-4 items-center">
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

            {/* If Date is in filters, show DatePicker */}
            {selectedFilters.includes("Date") && (
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="border p-2 rounded-md"
                placeholderText="Select a date"
              />
            )}

            {/* Clear All button, if at least one filter is active */}
            {selectedFilters.length > 0 && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-red-600 transition"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* DISPLAY SELECTED FILTERS AS "PILLS" */}
          {selectedFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedFilters.map((filter) => (
                <div
                  key={filter}
                  className="flex items-center bg-blue-400 text-white px-3 py-1 rounded-full"
                >
                  <span className="mr-1">{filter}</span>
                  {/* X button to remove this single filter */}
                  <button
                    type="button"
                    onClick={() => removeFilter(filter)}
                    className="ml-1 font-bold hover:opacity-80"
                    aria-label={`Remove filter ${filter}`}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* TWO CARDS FOR GRAPH AND RESULTS */}
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 mt-8">
        {/* TRENDS CARD */}
        <div className="flex flex-col flex-1 p-5 bg-gray-50 rounded-lg shadow-sm mr-0 md:mr-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">Trends</h2>
          <div className="flex-grow">
            <Graph
              client={client}
              filters={selectedFilters}
              selectedDate={selectedDate}
            />
          </div>
        </div>

        {/* RESULTS CARD */}
        <div className="flex flex-col flex-1 p-5 bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Assessment Results
          </h2>
          <div className="flex-grow overflow-y-auto">
            <Results
              data={assessmentHistory}
              client={client}
              filters={selectedFilters}
              selectedDate={selectedDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientOverview;
