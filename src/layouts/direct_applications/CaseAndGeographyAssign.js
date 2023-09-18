import useForms from "../../hooks/useForms";
import React, { useState, useRef } from "react";
import geographyMappingTemplate from "../../assets/xlsxFiles/geographyMappingTemplate.xlsx";
import userMappingTemplate from "../../assets/xlsxFiles/userGroupingTemplate.xlsx";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const CaseAndGeographyAssign = (passdata) => {
  const { UserCaseFileUpload, VillageDataFileUpload } = useForms();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);
  const [saveResponse, setSaveResponse] = useState("");
  const [isOpenLabel, setIsOpenLabel] = useState(false);

  const downloadTemplate = () => {
    if (passdata.name === "project") {
      return userMappingTemplate;
    } else if (passdata.name === "geography") {
      return geographyMappingTemplate;
    }
    return null;
  };

  const handleDownload = () => {
    const templateURL = downloadTemplate();
    if (templateURL) {
      window.location.href = templateURL;
    }
  };

  const handleFileUpload = async (event) => {
    if (!selectedFile) {
      return;
    }
    setIsLoading(true);

    try {
      if (passdata.name === "project") {
        const res = await UserCaseFileUpload(selectedFile);
        console.log("File uploaded successfully:", res.data.message);
        setSaveResponse(res.data.message);
      } else {
        console.log("loading geography files xlxs");
        const res = await VillageDataFileUpload(selectedFile);
        setSaveResponse(res.data.message);
      }
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

  const fileInputRef = useRef();

  const handleCloseButtonClick = () => {
    setSaveResponse(null);
    setSelectedFile(null);
    setIsSaveButtonEnabled(false);
    setIsOpenLabel(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSaveButtonClick = () => {
    handleFileUpload();
  };
  const handleOpenDialogBox = () => {
    setIsOpenLabel(false);
  };

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
          onClick={handleDownload}
          style={{
            backgroundColor: "#33a2b5",
            padding: "10px 20px",
            border: "none",
            borderRadius: "10px",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Download Template
        </Button>
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
      <label open={isOpenLabel} onClose={handleOpenDialogBox}>
        {saveResponse}
      </label>
    </>
  );
};

export default CaseAndGeographyAssign;
