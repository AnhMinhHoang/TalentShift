import React, { useState } from "react";

const ComboBox = ({ options, onChange }) => {
  const [selected, setSelected] = useState("");

  const handleChange = (event) => {
    setSelected(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <select value={selected} onChange={handleChange} className="form-select" style={{
        borderRadius: "40px",
        border: "2px solid #ccc",
        fontSize: "17px",
        paddingRight: "0px"
      }}>
      <option value="">Services</option>
      {options.map((opt, index) => (
        <option key={index} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default ComboBox;

