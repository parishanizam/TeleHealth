import { useNavigate } from "react-router-dom";
import ChevronIcon from "../../../assets/chevron.svg";

// eslint-disable-next-line react/prop-types
export function ClientCard({ client }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/clinicians/ClientOverview/${client.clientId}`, { state: { client } });
  };

  return (
    <div
      className="flex justify-between items-center px-3 py-7 mt-2.5 max-w-full bg-sky-400 rounded-xl gap-4 min-h-[101px] w-full cursor-pointer"
      tabIndex={0}
      role="button"
      onClick={handleClick}
      aria-label={`View client ${client.firstName} ${client.lastName}`}
    >
      <div className="self-stretch text-black my-auto">
        {client.firstName} {client.lastName}
      </div>
      <img
        loading="lazy"
        src={ChevronIcon}
        alt=""
        className="object-contain shrink-0 self-stretch my-auto w-12 aspect-square"
      />
    </div>
  );
}
