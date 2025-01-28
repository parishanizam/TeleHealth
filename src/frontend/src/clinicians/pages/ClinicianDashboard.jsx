import AddClientButton from "../components/ClinicianDashboard/AddClientButton";
import ClientList from "../components/ClinicianDashboard/ClientList";
import { Header } from "../components/Header";

function ClinicianDashboard() {
  return (
    <div>
    <Header title="Yao's Clients" showBackButton={false}/>
    <AddClientButton />
    <ClientList />
    </div>
  );
}

export default ClinicianDashboard;
