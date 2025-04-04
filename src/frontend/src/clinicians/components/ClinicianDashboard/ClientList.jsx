/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 20, 2025
 * Purpose: Contains list of all clients, which contains each client's client card, to be displayed on ClinicianDashboard
 */

import { useSelector } from "react-redux";
import { ClientCard } from "./ClientCard";

const ClientList = () => {
  const clinicianInfo = useSelector((state) => state.clinician.clinicianInfo);
  const clients = clinicianInfo?.client || [];

  return (
    <div className="h-full overflow-y-auto pr-2 space-y-3">
      {clients.length > 0 ? (
        clients.map((client) => (
          <ClientCard key={client.clientId} client={client} />
        ))
      ) : (
        <p className="text-gray-500 text-lg text-center">
          No clients added yet.
        </p>
      )}
    </div>
  );
};

export default ClientList;
