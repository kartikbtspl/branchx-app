import React from 'react';

const FormSelect = ({
  name,
  options = [],
  register,
  error,
  required = false,
  className = '',
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <select
        {...register(name, { required })}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400
          ${error ? 'border-red-500' : 'border-gray-300'}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-red-500 text-sm mt-1">{error.message}</span>
      )}
    </div>
  );
};

export default FormSelect;
