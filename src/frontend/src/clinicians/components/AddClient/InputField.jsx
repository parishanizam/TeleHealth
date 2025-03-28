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
