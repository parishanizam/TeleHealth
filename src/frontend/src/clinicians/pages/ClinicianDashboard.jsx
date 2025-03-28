import { useSelector } from "react-redux";
import AddClientButton from "../components/ClinicianDashboard/AddClientButton";
import ClientList from "../components/ClinicianDashboard/ClientList";
import { Header } from "../../parents/components/Header";

function ClinicianDashboard() {
  const clinicianInfo = useSelector((state) => state.clinician.clinicianInfo);

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      <div className="px-5 pt-4">
        <Header
          title={`${clinicianInfo?.firstname || "Clinician"}'s Clients`}
          role="clinician"
        />
      </div>

      <div className="px-5 w-full max-w-4xl mx-auto z-10">
        <AddClientButton />
      </div>

      {/* Scrollable ClientList */}
      <div className="flex-1 px-5 mt-2 w-full max-w-4xl mx-auto overflow-hidden">
        <ClientList />
      </div>
    </div>
  );
}

export default ClinicianDashboard;
