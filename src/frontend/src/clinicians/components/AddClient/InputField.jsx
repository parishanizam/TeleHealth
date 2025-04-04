/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 17, 2025
 * Purpose: Input field for consistent text inputs to be added to AddClient page
 */

function InputField({ id, name, type, placeholder, value, onChange }) {
  return (
    <div className="w-[438px] mb-5">
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="px-6 py-3 w-full rounded-2xl border border-solid border-zinc-300"
      />
    </div>
  );
}

export default InputField;
