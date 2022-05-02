function FormInput({ label, type, name, inputRef }) {
  return (
    <div>
      <label htmlFor={`${type}-${name}`} className="sr-only">
        {label}
      </label>
      <input
        id={`${type}-${name}`}
        ref={inputRef}
        autoComplete={name}
        name={name}
        type={type}
        required
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        placeholder={label}
      />
    </div>
  )
}

export default FormInput;