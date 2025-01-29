import { useNavigate } from "react-router-dom";
import AddIcon from "../../../assets/add_icon.svg";

const AddClientButton = () => {
  const navigate = useNavigate();

  const handleAddClient = () => {
    navigate("/clinicians/AddClientPage");
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <button
        onClick={handleAddClient}
        className="flex justify-center items-center gap-10 px-5 py-8 w-[940px] rounded-xl min-h-[100px] bg-green-600 text-white max-md:px-5"
        aria-label="Add new client"
      >
        <span className="w-[141px]">Add Client</span>
        <img src={AddIcon} alt="Add" className="object-contain w-[31px] cursor-pointer" />
      </button>
    </div>
  );
};

export default AddClientButton;
