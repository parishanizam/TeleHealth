// ClientCard.jsx
import { useNavigate } from "react-router-dom";
import ChevronIcon from "../../../assets/chevron.svg";

// eslint-disable-next-line react/prop-types
export function ClientCard({ client }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // We pass the entire "client" so it includes securityCode, etc.
    navigate(`/clinicians/ClientOverview/${client.clientId}`, {
      state: { client },
    });
  };

  return (
    <div
      className="flex justify-between items-center px-5 py-7 mt-2.5 bg-sky-400 rounded-xl gap-4 min-h-[101px] w-full max-w-[940px] cursor-pointer max-md:px-5"
      tabIndex={0}
      role="button"
      onClick={handleClick}
      aria-label={`View client ${client.firstName} ${client.lastName}`}
    >
      <span className="grow shrink self-stretch text-xl font-semibold my-auto w-auto">
        {client.firstName} {client.lastName}
      </span>
      <img
        loading="lazy"
        src={ChevronIcon}
        alt=""
        className="object-contain shrink-0 self-stretch my-auto w-12 aspect-square"
      />
    </div>
  );
}
