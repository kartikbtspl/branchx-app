import React from "react";

const SliderWithMarks = ({
  title,
  value,
  onChange,
  marks,
  min,
  max,
  step,
  estimateInfo,
  showResetButton = false,
  onReset,
}) => {
  return (
    <div>
      {title && (
        <h2 className="text-[#555555]  font-[500] ">{title}</h2>
      )}
      <div className="border p-4 rounded-md bg-gray-50 space-y-4 w-full">
        <div className="bg-white p-4 rounded-md shadow-sm">
          <p className="text-sm text-center text-gray-600 mb-2">
            You will spend upto{" "}
            <span className="font-semibold text-black">
              Rs. {value.toLocaleString()}
            </span>{" "}
            in total.
          </p>

          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full accent-blue-600"
          />

          <div className="flex justify-between text-xs text-gray-600 mt-2">
            {marks.map((mark) => (
              <span key={mark.value} className="whitespace-nowrap">
                {mark.label}
              </span>
            ))}
          </div>
        </div>

        {estimateInfo && (
          <div className="text-sm text-gray-600 flex items-start gap-1">
            <span className="text-blue-500">ℹ️</span>
            {estimateInfo}
          </div>
        )}

        {showResetButton && onReset && (
          <div className="flex justify-end">
            <button
              onClick={onReset}
              className="text-sm text-blue-500 underline hover:text-blue-600 transition"
            >
              Reset Price Range
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SliderWithMarks;
