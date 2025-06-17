import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";

const FormFileUpload = ({
  name,
  control,
  label = "Upload File",
  accept = "image/*,video/*",
  error,
}) => {
  const [previewURL, setPreviewURL] = useState(null);

  useEffect(() => {
    return () => {
      // Clean up the object URL
      if (previewURL) URL.revokeObjectURL(previewURL);
    };
  }, [previewURL]);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const handleChange = (e) => {
            const file = e.target.files?.[0];
            if (file) {
              field.onChange(file);
              setPreviewURL(URL.createObjectURL(file));
            }
          };

          const handleDrop = (e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (file) {
              field.onChange(file);
              setPreviewURL(URL.createObjectURL(file));
            }
          };

          const preventDefaults = (e) => {
            e.preventDefault();
            e.stopPropagation();
          };

          return (
            <div
              onDrop={handleDrop}
              onDragOver={preventDefaults}
              onDragEnter={preventDefaults}
              onDragLeave={preventDefaults}
              className="border-2 border-dashed border-blue-400 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-blue-600"
            >
              <input
                type="file"
                accept={accept}
                onChange={handleChange}
                className="hidden"
                id={`${name}-file`}
              />
              <label htmlFor={`${name}-file`} className="cursor-pointer text-gray-600">
                Drag & Drop or Click to Upload
              </label>

              {previewURL && (
                <div className="mt-4 w-full flex justify-center">
                  {field.value?.type?.startsWith("video") ? (
                    <video
                      src={previewURL}
                      className="max-h-48 object-contain"
                      controls
                    />
                  ) : (
                    <img
                      src={previewURL}
                      alt="preview"
                      className="max-h-48 object-contain"
                    />
                  )}
                </div>
              )}
            </div>
          );
        }}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default FormFileUpload;
