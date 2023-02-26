import { DialogContentText, TextField } from "@mui/material";
import { minWidth } from "@mui/system";
import { format } from "date-fns";
import React, { Fragment } from "react";
import { Model } from "../../types/Model";

type ModelFormProps = {
  data: any;
  handleDataChange: (field: string, value: string) => void;
};

function ModelForm({ data, handleDataChange }: ModelFormProps) {
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
          label="Price (USD)"
          type="number"
          variant="standard"
          value={data.price}
          fullWidth
          onChange={(e) => handleChange("price")(String(e.target.value))}
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

export default ModelForm;
