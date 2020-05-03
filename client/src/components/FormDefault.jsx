import React from "react";

// Material UI
import TextField from "@material-ui/core/TextField";

const FormDefault = ({ id, url, time, handle }) => {
  return (
    <>
      <div className="margin">
        <TextField
          id="id"
          label="id"
          value={id}
          variant="outlined"
          onChange={handle}
        />
        <TextField
          id="url"
          label="url"
          value={url}
          variant="outlined"
          onChange={handle}
        />
      </div>
      <TextField
        id="time"
        label="Time"
        type="datetime-local"
        value={time}
        onChange={handle}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </>
  );
};

export default FormDefault;
