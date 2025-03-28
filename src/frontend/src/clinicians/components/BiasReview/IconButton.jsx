function IconButton({ iconSrc, bgColor, onClick, className = "" }) {
  return (
    <button
      className={`flex items-center justify-center w-24 h-24 rounded-md ${bgColor} ${className}`}
      onClick={onClick}
    >
      <img src={iconSrc} alt="icon" className="w-12 h-12" />
    </button>
  );
}

export default IconButton;
