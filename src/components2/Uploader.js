import React, { useState } from "react";
import axios from "axios";

function Uploader({ id }) {
  const [selectedFile, setSelectedFile] = useState();

  function changeHandler(event) {
    setSelectedFile(event.target.files[0]);
  }

  function handleSubmission(e) {
    e.preventDefault();
    // console.log(selectedFile.name);
    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post(`http://localhost:8080/upload-avatar/${id}`, formData)
      .catch((e) => {
        console.error("Error-UPDATER", e);
      });
  }

  return (
    <div>
      <form method="POST" action="#" id="#" onSubmit={handleSubmission}>
        <input
          className="add"
          type="file"
          onChange={changeHandler}
          multiple=""
        />
        <input className="add" type="submit" />
      </form>
    </div>
  );
}

export default Uploader;
