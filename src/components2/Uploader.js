import React, { useState } from "react";
import axios from "axios";

function Uploader({ id, from }) {
  const [selectedFile, setSelectedFile] = useState();
  const [message, setMessage] = useState("");

  function changeHandler(event) {
    setSelectedFile(event.target.files[0]);
  }

  function handleSubmission(e) {
    e.preventDefault();
    const maxsize = 700 * 1024 * 1024;

    const size = selectedFile.size;
    console.log(size);

    if (size < maxsize) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      axios
        .post(`http://localhost:8080/upload-avatar/${id}&${from}`, formData)
        .catch((e) => {
          console.error("Error-UPDATER", e);
        });
      setMessage("");
    } else {
      setMessage(
        "Fichier trop volumineux, Taille max : " + maxsize / 1024 + " KBits"
      );
    }
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
      {message && <div className="file-size">{message}</div>}
    </div>
  );
}

export default Uploader;
