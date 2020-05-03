import React, { useState } from "react";

//Components
import FormDefault from "./components/FormDefault";
import FormCsv from "./components/FormCsv";
// Services
import sendForm from "./services/form.services";
import convertCSVToArray from "convert-csv-to-array";
import validateCsvData from "./utils/validateCsvData";
// Material UI
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import Typography from "@material-ui/core/Typography";
// CSS
import "./App.css";


function App() {
  const [timeTask, setTime] = useState();
  const [idTask, setId] = useState();
  const [urlTask, setUrl] = useState();
  const [csv, setCSV] = useState();

  const handleChange = ({ target: { id, value } }) =>
    id === "id" ? setId(value) : id === "url" ? setUrl(value) : setTime(value);

  const handleCsv = ({ target: { files } }) => {
    for (let file of files) {
      new Blob([file])
        .text()
        .then(string => convertCSVToArray(string, {
              type: "array",
              separator: ";",
            }))
        .then((arr) => validateCsvData(arr))
        .then((arr) => setCSV(arr))
        .catch((err) => console.log(err));
    }
  };

  const handleSubmit = () =>
    csv ? sendForm({ csv, urlTask }) : sendForm({ timeTask, idTask, urlTask });

  return (
    <div className="form">
      <Typography variant="h2">Distributed task queues</Typography>

      <FormDefault
        id={idTask}
        url={urlTask}
        time={timeTask}
        handle={handleChange}
      />
      <FormCsv handle={handleCsv} csv={csv} />

      <Button
        variant="contained"
        color="primary"
        endIcon={<SendIcon />}
        onClick={handleSubmit}
      >
        Send
      </Button>
    </div>
  );
}

export default App;
