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
        className="flex justify-between items-center bg-[#63A15E] hover:bg-[#54814B] transition-colors duration-200 gap-10 px-5 py-8 w-full max-w-[940px] rounded-xl min-h-[100px] max-md:px-5"
        aria-label="Add new client"
      >
        <span className="text-3xl text-left">Add Client</span>
        <img src={AddIcon} alt="Add" className="object-contain w-10 self-center cursor-pointer" />
      </button>
    </div>
  );
};

export default AddClientButton;
