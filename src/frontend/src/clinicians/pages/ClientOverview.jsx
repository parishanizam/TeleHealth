/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 19, 2025
 * Purpose: Displays ClientOverview page and its content
 */

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
        `https://telehealth-insights.onrender.com/assessment-history/${username}`,
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

  //filters
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
    <div className="flex flex-col min-h-screen px-5 pt-2.5 pb-6 bg-white overflow-y-auto">
      <Header
        title={`${client?.firstName} ${client?.lastName} - Overview`}
        role="clinician"
      />

      <div className="space-y-4 mt-3">
        <p className="text-lg">Security Code: {client?.securityCode}</p>
      </div>

      {/* Filter box */}
      <div className="w-full flex">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md mt-6 w-full max-w-full">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
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
            </div>

            {/* Inline filter chips */}
            {selectedFilters.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
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

            {/* Clear Filters button */}
            {selectedFilters.length > 0 && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-red-600 transition"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/*GRAPH*/}
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 mt-8">
        <div className="flex flex-col p-5 bg-gray-50 rounded-lg shadow-sm mr-0 md:mr-5 md:basis-2/3">
          <h2 className="text-2xl font-semibold text-center">Trends</h2>
          <div className="flex-grow">
            <Graph
              client={client}
              filters={selectedFilters}
              selectedDate={selectedDate}
            />
          </div>
        </div>

        {/* RESULTS CARD */}
        <div className="flex flex-col p-5 bg-gray-50 rounded-lg shadow-sm md:basis-1/3">
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