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

              <Form.Label htmlFor="language-select" className="visually-hidden">
                Select a language
              </Form.Label>
              <Form.Select
                id="language-select"
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

              <Form.Label htmlFor="testtype-select" className="visually-hidden">
                Select a test type
              </Form.Label>
              <Form.Select
                id="testtype-select"
                value={selectedTestType}
                onChange={(e) => setSelectedTestType(e.target.value)}
                className="mb-4 fs-5"
                disabled={!selectedLanguage}
                aria-describedby={!selectedLanguage ? "testtype-disabled-reason" : undefined}
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
              {!selectedLanguage && (
                <div id="testtype-disabled-reason" className="text-muted small">
                  Please select a language first
                </div>
              )}

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
