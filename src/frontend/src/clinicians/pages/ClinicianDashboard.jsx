import { useSelector } from "react-redux";
import AddClientButton from "../components/ClinicianDashboard/AddClientButton";
import ClientList from "../components/ClinicianDashboard/ClientList";
import { Header } from "../components/Header";

function ClinicianDashboard() {
  const clinicianInfo = useSelector((state) => state.clinician.clinicianInfo);

  return (
    <div className="flex flex-col px-5 pt-2.5 pb-80 bg-white max-md:pb-24">
      <Header title={`${clinicianInfo?.firstname || "Clinician"}'s Clients`} />
      <AddClientButton />
      <ClientList />
    </div>
  );
}

export default ClinicianDashboard;
