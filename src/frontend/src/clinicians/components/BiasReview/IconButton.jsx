// eslint-disable-next-line react/prop-types
function IconButton({ iconSrc, bgColor, onClick }) {
    return (
      <button
        className={`flex items-center justify-center w-12 h-12 rounded-md ${bgColor}`}
        onClick={onClick}
      >
        <img src={iconSrc} alt="icon" className="w-6 h-6" />
      </button>
    );
  }
  
  export default IconButton;
  