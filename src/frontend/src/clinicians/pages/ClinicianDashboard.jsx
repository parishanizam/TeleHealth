// import React from "react";
import AddClientButton from "../components/AddClientButton";
import ClinicianHeader from "../components/Header/ClinicianHeader";
import ClientList from "../components/ClientList";

function ClinicianDashboard() {
  return (
    <div>
    <ClinicianHeader />
    <AddClientButton />
    <ClientList />
    </div>
  );
}

export default ClinicianDashboard;
