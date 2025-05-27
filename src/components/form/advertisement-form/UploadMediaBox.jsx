import React, { useRef, useState } from 'react';

const UploadMediaBox = () => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleBoxClick = () => {
    fileInputRef.current.click(); 
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); 
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="border-2 mt-2 p-1 w-full ">
      <label className="text-[#555555] font-[500]">Upload Media:</label>

      <div
        onClick={handleBoxClick}
        className="border bg-[#F7F7F7] bg-gray-50 h-40 mt-1 relative cursor-pointer overflow-hidden"
      >
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-contain" />
        ) : (
          <p className="text-sm text-gray-500 p-2">Add Image or Video of your Ad here</p>
        )}

        <div className="absolute bottom-2 right-2 bg-[#F7F7F7]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM5 5h14v5l-3.5-3.5-4.5 6L8 10l-3 4V5z" />
          </svg>
        </div>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default UploadMediaBox;
