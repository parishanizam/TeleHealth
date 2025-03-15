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
      const response = await axios.get(`http://localhost:3000/resultstorage/assessment-history/${username}`);
      
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
    <div className="flex flex-col h-screen px-5 pt-2.5 bg-white max-md:pb-24 overflow-hidden">
      <Header title={`${parent?.firstName} ${parent?.lastName} - Assessments Overview`} />
      <div className="flex flex-col md:flex-row flex-grow space-y-6 md:space-y-0 md:space-x-6 h-full">
        <div className="flex-grow p-4 text-center flex flex-col h-full">
          <h2 className="text-2xl font-semibold mb-4">Trends</h2>
          <div className="flex-grow">
            <Graph parent={parent} />
          </div>
        </div>
        <div className="flex-grow p-4 text-center flex flex-col h-full">
          <h2 className="text-2xl font-semibold mb-4">Assessment Results</h2>
          <div className="flex-grow overflow-y-auto">
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
