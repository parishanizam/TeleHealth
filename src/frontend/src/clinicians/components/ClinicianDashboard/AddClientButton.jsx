import AddIcon from "../../../assets/add_icon.svg";

const buttonStyles = {
  backgroundColor: "#63A15E",
};

const buttonClassNames =
  "flex justify-center items-center flex-wrap gap-10 px-5 py-8 max-w-full rounded-xl min-h-[100px] w-[940px] max-md:px-5";

const imgClassNames =
  "object-contain shrink-0 self-stretch my-auto aspect-square w-[31px] cursor-pointer";

// eslint-disable-next-line react/prop-types
function AddClientButton({ onClick }) {
  return (
    <div className="flex items-center justify-center">
    <div
      style={buttonStyles}
      className={buttonClassNames}
      aria-label="Add new client"
    >
      <div className="grow shrink self-stretch my-auto w-[141px]">Add Client</div>
      <img src={AddIcon} className={imgClassNames} onClick={onClick} />
    </div>
    </div>
  );
}

export default AddClientButton;
