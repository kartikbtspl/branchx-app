import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { CloudUploadIcon, XCircleIcon } from "lucide-react";
import { Box, Typography, IconButton } from "@mui/material";

const FormFileUpload = ({
  name,
  control,
  accept = "image/*,video/*",
  error,
  customSx = {},        
  className = "",         
  inputProps = {},      
}) => {
  const [previewURL, setPreviewURL] = useState(null);
  const [fileType, setFileType] = useState(null);

  useEffect(() => {
    return () => {
      if (previewURL) URL.revokeObjectURL(previewURL);
    };
  }, [previewURL]);

  return (
    <Box mb={2} maxWidth={600} mx="auto" px={2} className={className}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const handleChange = (e) => {
            const file = e.target.files?.[0];
            if (file) {
              field.onChange(file);
              setPreviewURL(URL.createObjectURL(file));
              setFileType(file.type);
            }
          };

          const handleDrop = (e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (file) {
              field.onChange(file);
              setPreviewURL(URL.createObjectURL(file));
              setFileType(file.type);
            }
          };

          const preventDefaults = (e) => {
            e.preventDefault();
            e.stopPropagation();
          };

          const removeFile = () => {
            field.onChange(null);
            setPreviewURL(null);
            setFileType(null);
            const input = document.getElementById(`${name}-file`);
            if (input) input.value = "";
          };

          return (
            <>
              <Box
                onDrop={handleDrop}
                onDragOver={preventDefaults}
                onDragEnter={preventDefaults}
                onDragLeave={preventDefaults}
                onClick={() => document.getElementById(`${name}-file`)?.click()}
                sx={{
                  cursor: "pointer",
                  border: "2px dashed #3b82f6",
                  borderRadius: "0.5rem",
                  height: 192,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  overflow: "hidden",
                  position: "relative",
                  transition: "border-color 0.3s",
                  "&:hover": { borderColor: "#2563eb" },
                  bgcolor: previewURL ? "#f9fafb" : "transparent",
                  ...customSx, 
                }}
                aria-label="File upload area"
              >
                {!previewURL ? (
                  <>
                    <CloudUploadIcon
                      fontSize="large"
                      sx={{ color: "#3b82f6" }}
                      aria-hidden="true"
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1, px: 4, textAlign: "center" }}
                    >
                      Drag & Drop or Click to Upload File
                    </Typography>
                  </>
                ) : fileType?.startsWith("video") ? (
                  <video
                    src={previewURL}
                    controls
                    style={{
                      maxHeight: "192px",
                      width: "100%",
                      objectFit: "contain",
                      borderRadius: 8,
                    }}
                  />
                ) : (
                  <img
                    src={previewURL}
                    alt="Preview"
                    style={{
                      maxHeight: "192px",
                      maxWidth: "100%",
                      objectFit: "contain",
                      borderRadius: 8,
                    }}
                  />
                )}
                <input
                  id={`${name}-file`}
                  type="file"
                  accept={accept}
                  onChange={handleChange}
                  style={{ display: "none" }}
                  {...inputProps} 
                />
              </Box>

              {previewURL && (
                <Box textAlign="center" mt={1}>
                  <IconButton
                    onClick={removeFile}
                    color="error"
                    size="small"
                    aria-label="Remove file"
                    sx={{ textDecoration: "underline" }}
                  >
                    <XCircleIcon />
                    <Typography
                      component="span"
                      variant="caption"
                      sx={{ ml: 0.5, color: "error.main" }}
                    >
                      Remove File
                    </Typography>
                  </IconButton>
                </Box>
              )}

              {error && (
                <Typography
                  color="error"
                  variant="caption"
                  mt={1}
                  sx={{ display: "block", marginTop: "0.25rem" }}
                >
                  {error.message}
                </Typography>
              )}
            </>
          );
        }}
      />
    </Box>
  );
};

export default FormFileUpload;
