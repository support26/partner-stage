import useForms from "../../hooks/useForms";
import React, { useState } from "react";
import geographyMappingTemplate from "../../assets/xlsxFiles/geographyMappingTemplate.xlsx"
import userMappingTemplate from "../../assets/xlsxFiles/userGroupingTemplate.xlsx"
import Button from "@mui/material/Button";


const CaseAndGeographyAssign = (passdata) => {
  console.log("passdata", passdata);
  const { UserCaseFileUpload, VillageDataFileUpload } = useForms();
  const [useCases, setCases] = useState("");
  const [useGeography, setGeogrphy] = useState("");
  const [isOver, setIsOver] = useState(false);

  return (
    <>
      <div>
      <h3></h3>
      <Button
          // onClick={geographyMappingTemplate}
          style={{
            backgroundColor: "#33a2b5",
            padding: "7px 10px",
            border: "none",
            borderRadius: "10px",
            color: "#fff",
          }}
          href={geographyMappingTemplate}
        >Download Template
        </Button>
      </div>
    </>
  );
};

export default CaseAndGeographyAssign;
