import { Button } from "@mui/material";
import React from "react";

const style = {
  formDataContainer: {
    maxHeight: "600px",
    overflowY: "auto",
    padding: "20px",
  },

  borderedTable: {
    borderCollapse: "collapse",
    width: "100%",
  },

  borderedTableCell: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  },

  borderedTableHeader: {
    backgroundColor: "#f2f2f2",
  },
};
function FromDataComponent({ formData, onClose }) {
  return (
    <div style={style.formDataContainer}>
      <table style={style.borderedTable}>
        <thead>
          <tr>
            <th style={style.borderedTableHeader}>Fields</th>
            <th style={style.borderedTableHeader}>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(formData).map(([key, value]) => (
            <tr key={key}>
              <td style={style.borderedTableCell}>{key}</td>
              <td style={style.borderedTableCell}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FromDataComponent;
