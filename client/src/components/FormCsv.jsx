import React from "react";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Typography from "@material-ui/core/Typography";

const FormCsv = ({ handle, csv }) => {
  return (
    <div className="margin">
      <Typography variant="h6">
        You can add a .CSV file with the "ID" and "Time" of each task.
      </Typography>
      <input id="csv" type="file" className="none" onChange={handle} />
      <label htmlFor="csv">
        <Button
          variant="contained"
          color="default"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Upload
        </Button>
      </label>
      {csv ? (
        <Typography variant="subtitle1" color="primary">
          You can send the file
        </Typography>
      ) : (
        <Typography variant="subtitle1" color="secondary">
          Not selected yet
        </Typography>
      )}
    </div>
  );
};

export default FormCsv;
