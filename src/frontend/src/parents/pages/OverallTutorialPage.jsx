/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 22, 2025
 * Purpose: Displays OverallTutorialPage and its content
 */

import * as React from "react";
import { motion } from "framer-motion";
import { Brain, RotateCcw, Languages } from "lucide-react";
import { Card, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function TutorialCard({ title, description, icon: Icon, onStart }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Card
        className="shadow-lg transition-all duration-300 text-center"
        style={{
          minHeight: "500px",
          backgroundColor: "#dbeafe",
          borderRadius: "15px",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <Card.Body className="d-flex flex-column justify-content-between p-4">
          <div className="d-flex align-items-center justify-content-center pb-3">
            <div
              className="p-4 rounded-circle bg-white text-primary d-flex align-items-center justify-content-center"
              style={{ width: "80px", height: "80px" }}
            >
              <Icon size={50} />
            </div>
          </div>
          <h1
            className="fw-bold"
            style={{ fontSize: "38px", color: "#1e3a8a" }}
          >
            {title}
          </h1>
          <p
            className="text-dark flex-grow px-3 mt-3"
            style={{ fontSize: "22px", lineHeight: "1.6" }}
          >
            {description}
          </p>
          <Button
            variant="primary"
            className="w-100 mt-auto fs-4 py-2"
            onClick={onStart}
          >
            Start Tutorial
          </Button>
        </Card.Body>
      </Card>
    </motion.div>
  );
}

function OverallTutorialPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-vh-100">
      <Header title="TeleHealth Insights" />

      <Container className="text-center mt-4">
        <h1
          className="fw-bold mb-3"
          style={{ fontSize: "42px", color: "#0096FF" }}
        >
          Select a test type below to complete a Tutorial!
        </h1>
        <p className="mb-4" style={{ fontSize: "18px" }}>
          Available Tests on MERL: English/Mandarin Matching, English/Mandarin
          Repetition, Mandarin Quantifier.
        </p>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="row g-4"
        >
          <div className="col-md-4">
            <motion.div variants={item}>
              <TutorialCard
                title="Matching Tutorial"
                description="Match the correct image to the audio played. Perfect for visual learners and pattern recognition practice."
                icon={Brain}
                onStart={() => navigate("/parents/MatchingTutorialPage")}
              />
            </motion.div>
          </div>

          <div className="col-md-4">
            <motion.div variants={item}>
              <TutorialCard
                title="Repetition Tutorial"
                description="Practice repeating audio sentences correctly. Enhance your listening and speaking skills."
                icon={RotateCcw}
                onStart={() => navigate("/parents/RepetitionTutorialPage")}
              />
            </motion.div>
          </div>

          <div className="col-md-4">
            <motion.div variants={item}>
              <TutorialCard
                title="Mandarin Quantifier"
                description="Learn to match images with Mandarin quantifiers. Ideal for language learning and comprehension."
                icon={Languages}
                onStart={() => navigate("/parents/QuantifierTutorialPage")}
              />
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}

export default OverallTutorialPage;
