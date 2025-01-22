// import React from "react";
import AddClientButton from "../components/ClinicianDashboard/AddClientButton";
// import ClinicianHeader from "../components/Header/ClinicianHeader";
import ClientList from "../components/ClinicianDashboard/ClientList";
import { Header } from "../components/Header";

function ClinicianDashboard() {
  return (
    <div>
    {/* <ClinicianHeader text="Yao's Clients"/> */}
    <Header title="Yao's Clients" showBackButton={false}/>
    <AddClientButton />
    <ClientList />
    </div>
  );
}

export default ClinicianDashboard;
