import { ClientCard } from "./ClientCard";

const clients = [
  { name: "Mitchell Weingust", id: 1 },
  { name: "Promish Kandel", id: 2 },
  { name: "Parisha Nizam", id: 3 },
  { name: "Jasmine Sun-Hu", id: 4 },
];

function ClientList() {
  return (
    <div className="flex flex-col justify-center items-center py-10 w-full">
      <div className="flex flex-col justify-center items-center w-full max-w-[1402px]">
        {clients.map((client) => (
          <ClientCard key={client.id} name={client.name} />
        ))}
      </div>
    </div>
  );
}

export default ClientList;
