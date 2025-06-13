import React, { useState } from "react";

const MediaUploader = ({ initialMediaUrl = "", onUpload }) => {
  const [mediaUrl, setMediaUrl] = useState(initialMediaUrl);
  const [file, setFile] = useState(null);

  const isVideo = mediaUrl?.match(/\.(mp4|webm|ogg)$/i);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const tempUrl = URL.createObjectURL(uploadedFile);
      setMediaUrl(tempUrl);
      setFile(uploadedFile);

      // Callback to parent for upload to backend
      if (onUpload) {
        onUpload(uploadedFile);
      }
    }
  };

  return (
    <>
      <h2 className="text-sm font-medium text-gray-700 mb-2">Uploaded Media</h2>
      <div className="">
        <div className="w-full h-[300px] bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center overflow-hidden mb-4">
          {mediaUrl ? (
            isVideo ? (
              <video
                src={mediaUrl}
                controls
                className="w-full h-full object-contain rounded-xl"
              />
            ) : (
              <img
                src={mediaUrl}
                alt="Uploaded media"
                className="w-full h-full object-contain rounded-xl"
              />
            )
          ) : (
            <p className="text-gray-400 text-sm">No media uploaded yet</p>
          )}
        </div>

        
      </div>
    </>
  );
};

export default MediaUploader;
