import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import sendForm from "./services/form.services";

import "./App.css";

function App() {
  const [timeTask, setTime] = useState();
  const [idTask, setId] = useState();
  const [urlTask, setUrl] = useState();
  const [csv, setCSV] = useState();

  const handleChange = ({ target: { id, value } }) =>
    id === "id" ? setId(value) : id === "url" ? setUrl(value) : id=== "csv" ? setCSV(value) : setTime(value);

  const handleSubmit = () => sendForm({ timeTask, idTask, urlTask });

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
      <input id="csv" type="file" value={csv} onChange={handleChange} />
      <button onClick={handleSubmit}>ENVIAR</button>
    </div>
  );
}

export default App;
