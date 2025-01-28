// eslint-disable-next-line react/prop-types
function GenerateButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2.5 text-xl leading-none text-white bg-slate-900 rounded-lg shadow-sm w-[433px] hover:opacity-80 active:opacity-100"
    >
      Generate Client Number
    </button>
  );
}

export default GenerateButton;
