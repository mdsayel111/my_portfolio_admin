const SwitchBtn = ({ name, label, checked, onChange, disabled }) => {
  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor="switch-component"
        className="ml-2 text-sm cursor-pointer font-semibold"
      >
        {label}
      </label>
      <div className="relative inline-block w-11 h-5 ml-3">
        <input
          name={name}
          checked={checked}
          onChange={onChange}
          id="switch-component"
          type="checkbox"
          className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300"
          disabled={disabled}
        />
        <div className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"></div>
      </div>
    </div>
  );
};

export default SwitchBtn;
