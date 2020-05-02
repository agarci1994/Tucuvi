import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import sendForm from "./services/form.services";
import convertCSVToArray from 'convert-csv-to-array'
import validateCsvData from './utils/validateCsvData'

import "./App.css";

function App() {
  const [timeTask, setTime] = useState();
  const [idTask, setId] = useState();
  const [urlTask, setUrl] = useState();
  const [csv, setCSV] = useState();

  const handleChange = ({ target: { id, value } }) =>
    id === "id" ? setId(value) : id === "url" ? setUrl(value) : setTime(value);

  const handleCsv = ({target: {files}}) => {
  let fileArray
    for (let file of files) {
      (new Blob([file])).text()
      .then(string => fileArray = convertCSVToArray(string, {type: 'array', separator: ';',}))
      .then(arr => validateCsvData(arr))
      .then(arr => setCSV(arr))
      .catch(err => console.log(err))
    }
  }

  const handleSubmit = () => csv ? sendForm({csv, urlTask}) : sendForm({ timeTask, idTask, urlTask });

  return (
    <div className="App">
      <div>
        <TextField
          id="id"
          label="id"
          value={idTask}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="url"
          label="url"
          value={urlTask}
          variant="outlined"
          onChange={handleChange}
        />
      </div>
      <input
        id="time"
        type="datetime-local"
        value={timeTask}
        onChange={handleChange}
      />
      <input id="csv" type="file" onChange={handleCsv} />
      <button onClick={handleSubmit}>ENVIAR</button>
    </div>
  );
}

export default App;
