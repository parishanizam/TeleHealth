import ChevronIcon from "../../../assets/chevron.svg";

export function ClientCard({ name }) {
  return (
    <div
      className="flex justify-between items-center px-3 py-7 mt-2.5 max-w-full bg-sky-400 rounded-xl gap-4 min-h-[101px] w-full"
      tabIndex={0}
      role="button"
      aria-label={`View client ${name}`}
    >
      <div className="self-stretch text-black my-auto">{name}</div>
      <img
        loading="lazy"
        src={ChevronIcon}
        alt=""
        className="object-contain shrink-0 self-stretch my-auto w-12 aspect-square"
      />
    </div>
  );
}
