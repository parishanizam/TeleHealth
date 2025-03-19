import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { House, BoxArrowRight } from "react-bootstrap-icons";

export function Header({ title, showLogout = true, showHome = true, role = "parent" }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("/api/clinicians/logout", { method: "POST" });
      await fetch("/api/parents/logout", { method: "POST" });

      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");

      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleHomeClick = () => {
    if (role === "clinician") {
      navigate("../../clinicians/ClinicianDashboard");
    } else {
      navigate("/parents/ParentHomePage");
    }
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm w-100">
      <Container className="d-flex justify-content-between align-items-center w-100">

        {/* HOME BUTTON */}
        {showHome && (
          <Button
            variant="link"
            className="text-dark fw-bold d-flex align-items-center"
            onClick={handleHomeClick}
          >
            <House size={24} className="me-2" /> Home
          </Button>
        )}

        <Navbar.Text className="fs-2 fw-bold mx-auto">{title}</Navbar.Text>

        {/* LOGOUT BUTTON (no color/border) */}
        {showLogout && (
          <Button
            variant="link"
            className="text-dark fw-bold d-flex align-items-center"
            onClick={handleLogout}
          >
            <BoxArrowRight size={20} className="me-2" />
            Logout
          </Button>
        )}

      </Container>
    </Navbar>
  );
}
