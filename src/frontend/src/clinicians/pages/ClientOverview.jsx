import React, { useState, useEffect } from "react";
import axios from "axios";
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

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [assessmentHistory, setAssessmentHistory] = useState([]); // Store results

  useEffect(() => {
    if (client?.parentUsername) {
      fetchAssessmentHistory(client.parentUsername);
    }
  }, [client]);

  const fetchAssessmentHistory = async (username) => {
    try {
      const response = await axios.get(`http://localhost:3000/resultstorage/assessment-history/${username}`);
  
      console.log("Fetched Data:", response.data); // Debugging output
      console.log("Assessments:", response.data.assessments); // Check if assessments exist
  
      if (response.data && Array.isArray(response.data.assessments)) {
        setAssessmentHistory(response.data.assessments);
      } else {
        console.warn("No assessments found in the response.");
        setAssessmentHistory([]); // Ensure it's an empty array to prevent errors
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

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
      <Header title={`${client?.firstName} ${client?.lastName} - Overview`} />

      <div className="p-4 space-y-4">
        <h2 className="text-lg font-semibold">Client Details</h2>
        <p className="text-lg">Security Code: {client?.securityCode}</p>
      </div>

      {/* Filters: NEED TO BE FIXED BEFORE UNCOMMENTING */} 
      {/* <div className="p-4 space-y-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <div className="flex flex-col space-y-2">
          <label className="font-medium">Select a Filter:</label>
          <div className="flex gap-4 items-center">
            <select className="border p-2 rounded-md" onChange={handleFilterChange} value="">
              <option value="" disabled>Select a filter</option>
              {filterOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
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
        </div>
      </div> */}

      {/* Graph & Results */}
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <div className="flex-grow p-4 text-center">
        <h2 className="text-2xl font-semibold mb-4">Graph</h2>
          <Graph client={client} />
        </div>
        <div className="flex-grow p-4 text-center">
           <h2 className="text-2xl font-semibold mb-4">Results</h2>
          <Results 
            data={assessmentHistory} 
            client={client} 
            filters={selectedFilters} 
            selectedDate={selectedDate} 
          />
        </div>
      </div>
    </div>
  );
}

export default ClientOverview;
