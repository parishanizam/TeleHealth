import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTestSelection } from "../../redux/testSelectionSlice";
import { Header } from "../components/Header";
import { Container, Card, Form, Button } from "react-bootstrap";

const testTypeOptionsByLanguage = {
  english: [
    { label: "Matching", value: "matching" },
    { label: "Repetition", value: "repetition" }
  ],
  mandarin: [
    { label: "Matching", value: "matching" },
    { label: "Repetition", value: "repetition" },
    { label: "Quantifier", value: "quantifier" }
  ]
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

    dispatch(setTestSelection({ language: selectedLanguage, testType: selectedTestType }));
    navigate("/parents/checklist");
  };

  return (
    <Container fluid className="d-flex flex-column align-items-center justify-content-center">
      <div className="w-100 text-center mt-3 mb-28">
        <Header title="Test Selection" />
      </div>
      <Card className="shadow p-4 text-dark" style={{ backgroundColor: "#89cff0", width: "60%", minHeight: "400px" }}>
        <Card.Body>
          <Card.Title className="text-center text-dark fw-bold mt-4 fs-2 mb-4">
            Select a Language
          </Card.Title>
          <Form.Select
            value={selectedLanguage}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="mb-4"
          >
            <option value="" disabled>Select a language</option>
            <option value="english">English</option>
            <option value="mandarin">Mandarin</option>
          </Form.Select>

          <Card.Title className="text-center text-dark fw-bold mt-4 fs-2 mb-4">
            Select a Test Type
          </Card.Title>
          <Form.Select
            value={selectedTestType}
            onChange={(e) => setSelectedTestType(e.target.value)}
            className="mb-4"
            disabled={!selectedLanguage}
          >
            <option value="" disabled>Select a test type</option>
            {selectedLanguage &&
              testTypeOptionsByLanguage[selectedLanguage].map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </Form.Select>

          <div className="d-flex justify-content-center">
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!selectedLanguage || !selectedTestType}
            >
              Next
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default TestSelectionPage;
