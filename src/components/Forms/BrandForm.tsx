import { TextField } from "@mui/material";
import React from "react";

type BrandFormProps = {
  data: any;
  handleDataChange: (field: string, value: string) => void;
};

function BrandForm({ data, handleDataChange }: BrandFormProps) {
  const handleChange = (field: any) => {
    return (value: string) => {
      handleDataChange(field, value);
    };
  };

  return (
    <div style={{ minWidth: "500px" }}>
      <div style={{ marginBottom: "20px" }}>
        <TextField
          // error
          id="outlined-error"
          autoFocus
          margin="dense"
          label="Model name"
          type="string"
          variant="standard"
          value={data.name}
          fullWidth
          onChange={(e) => handleChange("name")(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Model description"
          type="string"
          variant="standard"
          value={data.description}
          fullWidth
          onChange={(e) => handleChange("description")(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Release date"
          type="date"
          variant="standard"
          value={data.releaseDate}
          fullWidth
          onChange={(e) => {
            handleChange("releaseDate")(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default BrandForm;
