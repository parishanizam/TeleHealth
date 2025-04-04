/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 27, 2025
 * Purpose: Displays TestSelectionPage and its content
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTestSelection } from "../../redux/testSelectionSlice";
import { Header } from "../components/Header";
import { Container, Card, Form, Button } from "react-bootstrap";

const testTypeOptionsByLanguage = {
  english: [
    { label: "Matching", value: "matching" },
    { label: "Repetition", value: "repetition" },
  ],
  mandarin: [
    { label: "Matching", value: "matching" },
    { label: "Repetition", value: "repetition" },
    { label: "Quantifier", value: "quantifier" },
  ],
};

function TestSelectionPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedTestType, setSelectedTestType] = useState("");

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setSelectedTestType("");
  };

  const handleNext = () => {
    if (!selectedLanguage || !selectedTestType) {
      alert("Please select a language and test type.");
      return;
    }

    dispatch(
      setTestSelection({
        language: selectedLanguage,
        testType: selectedTestType,
      }),
    );
    navigate("/parents/checklist");
  };

  return (
    <div className="bg-white min-vh-100">
      <Header title="Test Selection" />
      <Container className="text-center mt-4">
        <h1
          className="fw-bold mb-3"
          style={{ fontSize: "42px", color: "#1e3a8a" }}
        >
          Choose Your Test
        </h1>
        <p className="mb-4" style={{ fontSize: "18px" }}>
          Select a language and test type below to continue.
        </p>

        <div className="d-flex justify-content-center">
          <Card
            className="shadow-lg text-center"
            style={{
              backgroundColor: "#dbeafe",
              borderRadius: "15px",
              width: "80%",
              padding: "30px",
            }}
          >
            <Card.Body>
              <Card.Title
                className="fw-bold mb-4"
                style={{ fontSize: "32px", color: "black" }}
              >
                Select a Language
              </Card.Title>
              <Form.Select
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="mb-4 fs-5"
              >
                <option value="" disabled>
                  Select a language
                </option>
                <option value="english">English</option>
                <option value="mandarin">Mandarin</option>
              </Form.Select>

              <Card.Title
                className="fw-bold mt-4 mb-4"
                style={{ fontSize: "32px", color: "black" }}
              >
                Select a Test Type
              </Card.Title>
              <Form.Select
                value={selectedTestType}
                onChange={(e) => setSelectedTestType(e.target.value)}
                className="mb-4 fs-5"
                disabled={!selectedLanguage}
              >
                <option value="" disabled>
                  Select a test type
                </option>
                {selectedLanguage &&
                  testTypeOptionsByLanguage[selectedLanguage].map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
              </Form.Select>

              <Button
                variant="primary"
                className="w-100 fs-5 py-2"
                onClick={handleNext}
                disabled={!selectedLanguage || !selectedTestType}
              >
                Next
              </Button>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default TestSelectionPage;