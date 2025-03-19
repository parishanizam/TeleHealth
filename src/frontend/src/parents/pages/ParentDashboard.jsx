import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Graph from "../components/ParentOverview/Graph";
import { Results } from "../components/ParentOverview/Results";
import { Header } from "../components/Header";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ParentOverview() {
  const parent = useSelector((state) => state.parent.parentInfo);
  const navigate = useNavigate();

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [assessmentHistory, setAssessmentHistory] = useState([]);

  useEffect(() => {
    if (parent?.username) {
      fetchAssessmentHistory(parent.username);
    }
  }, [parent]);

  const fetchAssessmentHistory = async (username) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/resultstorage/assessment-history/${username}`
      );
      if (response.data && Array.isArray(response.data.assessments)) {
        setAssessmentHistory(response.data.assessments);
      } else {
        setAssessmentHistory([]);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const filterOptions = [
    "English",
    "Mandarin",
    "Matching",
    "Repetition",
    "Quantifier",
    "Date",
  ];

  const handleFilterChange = (e) => {
    const { value } = e.target;

    if (value === "Date" && !selectedFilters.includes("Date")) {
      setSelectedFilters((prev) => [...prev, value]);
      return;
    }

    if (selectedFilters.includes(value)) {
      removeFilter(value);
      return;
    }

    setSelectedFilters((prev) => [...prev, value]);
  };

  const removeFilter = (filter) => {
    setSelectedFilters((prev) => prev.filter((f) => f !== filter));
    if (filter === "Date") {
      setSelectedDate(null);
    }
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    setSelectedDate(null);
  };

  return (
    // CHANGED overflow-hidden to overflow-y-auto:
    <div className="flex flex-col h-screen px-6 pt-4 pb-6 bg-white max-md:pb-20 overflow-y-auto">
      <Header
        title={`${parent?.firstName} ${parent?.lastName} - Assessments Overview`}
      />

      {/* Filter Box */}
      <div className="w-full flex">
        <div className="p-4 space-y-4 bg-blue-50 border border-blue-200 rounded-md mt-6 max-w-sm w-full">
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

            {selectedFilters.includes("Date") && (
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="border p-2 rounded-md"
                placeholderText="Select a date"
              />
            )}

            {selectedFilters.length > 0 && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Clear Filters
              </button>
            )}
          </div>

          {selectedFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedFilters.map((filter) => (
                <div
                  key={filter}
                  className="flex items-center bg-blue-400 text-white px-3 py-1 rounded-full"
                >
                  <span className="mr-1">{filter}</span>
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

      {/* Main Layout: Trends & Assessment Results */}
      <div className="flex flex-col md:flex-row flex-grow gap-6 h-full min-h-0 mt-6">
        <div className="flex flex-col flex-1 p-5 bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-center">Trends</h2>
          <div className="flex-grow min-h-0">
            <Graph
              parent={parent}
              filters={selectedFilters}
              selectedDate={selectedDate}
            />
          </div>
        </div>

        <div className="flex flex-col flex-1 p-5 bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Assessment Results
          </h2>
          <div className="flex-grow overflow-y-auto min-h-0 p-2">
            <Results
              data={assessmentHistory}
              parent={parent}
              filters={selectedFilters}
              selectedDate={selectedDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParentOverview;
