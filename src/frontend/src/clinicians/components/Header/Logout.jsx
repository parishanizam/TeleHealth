import LogoutIcon from "../images/logout.svg";

// eslint-disable-next-line react/prop-types
function Logout({ onClick }) {
  const imgClassNames = "h-6 w-6"; // Define class names for the icon

  return (
    <button
      className="flex items-center justify-center overflow-hidden px-2 py-3.5 my-auto w-[71px]"
      aria-label="Logout"
      onClick={onClick}
    >
      <img src={LogoutIcon} className={imgClassNames} onClick={onClick} />
      <div className="object-contain self-center aspect-square w-[25px]">Logout</div> {/* Add spacing between the icon and text */}
    </button>
  );
}

export default Logout;
