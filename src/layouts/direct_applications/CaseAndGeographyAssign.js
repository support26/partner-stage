import useForms from "../../hooks/useForms";
import React, { useState } from "react";

const CaseAndGeographyAssign = (passdata) => {
  console.log("passdata", passdata);
  const { UserCaseFileUpload, VillageDataFileUpload } = useForms();
  const [useCases, setCases] = useState("");
  const [useGeography, setGeogrphy] = useState("");

  return (
    <>
      <div>
        <h3>assig</h3>
      </div>
    </>
  );
};

export default CaseAndGeographyAssign;
