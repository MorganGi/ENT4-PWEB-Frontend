import React, { useState } from "react";
import axios from "axios";

function Uploader({ id }) {
  const [selectedFile, setSelectedFile] = useState();
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    // console.log(selectedFile.name);
    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post("http://localhost:8080/upload/pdf/", formData)
      .then((e) => {
        // console.log("Success", e);
        axios.post(
          `http://localhost:8080/solutions/${id}&${e.data.originalname}`
        );
      })
      .catch((e) => {
        console.error("Error", e);
      });
  };

  return (
    <div>
      <form method="POST" action="#" id="#" onSubmit={handleSubmission}>
        <input type="file" onChange={changeHandler} multiple="" />
        <input type="submit" />
      </form>
    </div>
  );
}

export default Uploader;
