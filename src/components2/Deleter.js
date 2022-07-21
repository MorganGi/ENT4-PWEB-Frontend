import React from "react";
import axios from "axios";

function Deleter({ id }) {
  const handleSubmission = (e) => {
    axios
      .get(`http://localhost:8080/solutions/del/${id}`)
      .then((e) => {
        console.log("FRONT", e);
      })
      .catch((e) => {
        console.error("Error", e);
      });
  };
  return (
    <div>
      <input
        className="delete"
        type="submit"
        value="Supprimer"
        onClick={handleSubmission}
      />
    </div>
  );
}

export default Deleter;
