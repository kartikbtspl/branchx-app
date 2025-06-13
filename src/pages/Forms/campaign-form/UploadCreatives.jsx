import React, { useState, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";

const creativeTypes = ["Visual", "Informational", "Interactive"];

const UploadCreatives = () => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const file = watch("creativeFile");
  const [previewURL, setPreviewURL] = useState(null);

  useEffect(() => {
    if (file instanceof File) {
      setPreviewURL(URL.createObjectURL(file));
    }
  }, [file]);

  const handleDrop = (e) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile) {
      setValue("creativeFile", uploadedFile, { shouldValidate: true });
      setPreviewURL(URL.createObjectURL(uploadedFile));
    }
  };

  const preventDefaults = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setValue("creativeFile", uploadedFile, { shouldValidate: true });
      setPreviewURL(URL.createObjectURL(uploadedFile));
    }
  };

  const handleClearImage = () => {
    setValue("creativeFile", null, { shouldValidate: true });
    setPreviewURL(null);
  };

  return (
    <div className="bg-white w-full max-w-6xl mx-auto p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Upload Creatives</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Upload + Preview */}
        <div>
          <label
            onDrop={handleDrop}
            onDragOver={preventDefaults}
            onDragEnter={preventDefaults}
            onDragLeave={preventDefaults}
            htmlFor="creativeFileInput"
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-blue-400 rounded-lg cursor-pointer hover:border-blue-600 transition-colors relative overflow-hidden"
          >
            <input
              id="creativeFileInput"
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {!previewURL ? (
              <div className="flex flex-col items-center text-center px-4">
                <svg
                  className="w-8 h-8 text-blue-500 mb-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 12V4m0 0l-3.5 3.5M12 4l3.5 3.5" />
                </svg>
                <p className="text-sm text-gray-600">
                  Drag & Drop or Click to Upload File
                </p>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-50">
                {file?.type?.startsWith("video") ? (
                  <video
                    src={previewURL}
                    className="w-full h-full object-contain"
                    controls
                  />
                ) : (
                  <img
                    src={previewURL}
                    alt="Preview"
                    className="max-h-48 object-contain"
                  />
                )}
              </div>
            )}
          </label>

          {/* Remove Button */}
          {previewURL && (
            <button
              type="button"
              onClick={handleClearImage}
              className="mt-2 text-red-500 underline text-sm"
            >
              Remove File
            </button>
          )}

          {/* Creative Type Radio */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Creative Type
            </label>
            <Controller
              name="creativeType"
              control={control}
              defaultValue=""
              rules={{ required: "Please select a creative type" }}
              render={({ field }) => (
                <div className="flex gap-6">
                  {creativeTypes.map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <input
                        type="radio"
                        value={type}
                        checked={field.value === type}
                        onChange={field.onChange}
                        className="accent-blue-600"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              )}
            />
            {errors.creativeType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.creativeType.message}
              </p>
            )}
          </div>
        </div>

        {/* Duration & Interval */}
        <div className="w-full space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (in seconds)
            </label>
            <Controller
              name="duration"
              control={control}
              defaultValue="15"
              render={({ field }) => (
                <input
                  type="number"
                  {...field}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interval (in seconds)
            </label>
            <Controller
              name="interval"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  type="number"
                  {...field}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadCreatives;


