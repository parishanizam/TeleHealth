import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Graph from "../components/ParentOverview/Graph";
import { Results } from "../components/ParentOverview/Results";
import { Header } from "../components/Header";

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

  return (
    <div className="flex flex-col h-screen px-6 pt-4 pb-6 bg-white max-md:pb-20 overflow-hidden">
      <Header title={`${parent?.firstName} ${parent?.lastName} - Assessments Overview`} />
      
      <div className="flex flex-col md:flex-row flex-grow gap-6 h-full min-h-0">
        {/* Trends Section */}
        <div className="flex flex-col flex-1 p-5 bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-center">Trends</h2>
          <div className="flex-grow min-h-0">
            <Graph parent={parent} />
          </div>
        </div>

        {/* Assessment Results Section */}
        <div className="flex flex-col flex-1 p-5 bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-center">Assessment Results</h2>
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
