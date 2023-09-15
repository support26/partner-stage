import useCases from "../../hooks/useCases";
import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const FileUploadComponent = (passdata) => {
  const { uploadCaseDataSheet } = useCases();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [saveResponse, setSaveResponse] = useState("");

  const handleFileUpload = async () => {
    if (!selectedFile) {
      return;
    }
    setIsLoading(true);
    try {
      const res = await uploadCaseDataSheet(selectedFile);
      console.log("File uploaded successfully:", res);
      setSaveResponse(res.response.message);
    } catch (error) {
      console.error("Upload error:", error);
      setSaveResponse(error.response.statusText);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.name.endsWith(".xlsx")) {
      setSelectedFile(file);
      setIsSaveButtonEnabled(true);
      setSaveResponse(false);
    } else {
      setSaveResponse("Only select xlsx file");
      setSelectedFile(null);
      setIsSaveButtonEnabled(false);
    }
  };

  const handleCloseButtonClick = () => {
    setSaveResponse("");
    setSelectedFile(null);
    setIsSaveButtonEnabled(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSaveButtonClick = () => {
    handleFileUpload();
    setIsOpenDialog(true);
  };

  const handleOpenDialogBox = () => {
    setIsOpenDialog(false);
  };

  const fileInputRef = useRef();

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px",
          gap: "10px",
        }}
      >
        <Button
          onClick={() => fileInputRef.current.click()}
          style={{
            backgroundColor: "#33a2b5",
            padding: "10px 20px",
            border: "none",
            borderRadius: "10px",
            color: "#fff",
            cursor: "pointer",
            width: "auto",
          }}
          startIcon={<CloudUploadIcon />}
        >
          Upload File
        </Button>

        <input
          type="file"
          accept=".xlsx" // Specify the allowed file types
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {isLoading && <div>Loading...</div>}
        {selectedFile && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                border: "1px solid #33a2b5",
                borderRadius: "4px",
                padding: "10px",
                boxSizing: "border-box",
              }}
            >
              <input
                readOnly
                style={{
                  border: "10px",
                  cursor: "pointer",
                  width: "100%",
                }}
                type="text"
                value={selectedFile.name}
              />
              <span style={{ width: "10px" }}></span>

              <IconButton
                edge="end"
                aria-label="close"
                style={{
                  display: "block",
                  marginRight: "1px",
                  border: "2px solid #33a2b5",
                  padding: "2px",
                }}
                onClick={handleCloseButtonClick}
              >
                <CloseIcon />
              </IconButton>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <Button
                onClick={handleSaveButtonClick}
                disabled={!isSaveButtonEnabled}
                style={{
                  backgroundColor: "#33a2b5",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "10px",
                  color: "#fff",
                  cursor: "pointer",
                  width: "100%", // Change to 100% for full width
                }}
              >
                Save
              </Button>
            </div>
          </div>
        )}
      </div>
      <label open={isOpenDialog} onClose={handleOpenDialogBox}>
        {saveResponse}
      </label>
    </>
  );
};

export default FileUploadComponent;
