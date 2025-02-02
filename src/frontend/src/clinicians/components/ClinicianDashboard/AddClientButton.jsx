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
        className="flex justify-center items-center bg-[#63A15E] flex-wrap gap-10 px-5 py-8 max-w-full rounded-xl min-h-[100px] w-[940px] max-md:px-5"
        aria-label="Add new client"
      >
        <span className="grow shrink self-stretch text-3xl my-auto w-[141px]">Add Client</span>
        <img src={AddIcon} alt="Add" className="object-contain shrink-0 self-stretch my-auto aspect-square w-[31px] cursor-pointer" />
      </button>
    </div>
  );
};

export default AddClientButton;
