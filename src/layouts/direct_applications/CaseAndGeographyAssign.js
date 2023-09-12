import useForms from "../../hooks/useForms";
import React, { useState } from "react";
import geographyMappingTemplate from "../../assets/xlsxFiles/geographyMappingTemplate.xlsx";
import userMappingTemplate from "../../assets/xlsxFiles/userGroupingTemplate.xlsx";
import Button from "@mui/material/Button";

const CaseAndGeographyAssign = (passdata) => {
  const { UserCaseFileUpload, VillageDataFileUpload } = useForms();
  const [isLoading, setIsLoading] = useState(false);

  const downloadTemplate = () => {
    if (passdata.name === "case") {
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
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    setIsLoading(true);

    try {
      if (passdata.name === "case") {
        const res = await UserCaseFileUpload(file);
        console.log("File uploaded successfully:", res);
      } else {
        console.log("loading geography files xlxs");
        const res = await VillageDataFileUpload(file);
        console.log("File uploaded successfully:", res);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const fileInputRef = React.createRef();

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
          onClick={handleUploadButtonClick}
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
          onChange={handleFileUpload}
        />
        {isLoading && <div>Loading...</div>}
      </div>
    </>
  );
};

export default CaseAndGeographyAssign;
