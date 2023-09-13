import React from "react";

function FromDataComponent({ formData, onClose }) {
  return (
    <div>
      {/* Display the formData */}
      <pre>{JSON.stringify(formData, null, 2)}</pre>
      {/* Add a close button to close the component */}
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default FromDataComponent;
