import { useSelector } from "react-redux";
import { ClientCard } from "./ClientCard";

const ClientList = () => {
  const clinicianInfo = useSelector((state) => state.clinician.clinicianInfo);
  const clients = clinicianInfo?.client || [];

  return (
    <div className="flex flex-col items-center py-10 w-full">
      <div className="w-full max-w-[1402px]">
        {clients.length > 0 ? (
          clients.map((client, index) => (
            <ClientCard key={index} name={client.name} />
          ))
        ) : (
          <p className="text-gray-500 text-lg">No clients added yet.</p>
        )}
      </div>
    </div>
  );
};

export default ClientList;
