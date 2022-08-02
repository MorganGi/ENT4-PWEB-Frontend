import React from "react";
import axios from "axios";

function Deleter({ id }) {
  const handleSubmission = (e) => {
    axios.get(`http://localhost:8080/solutions/del/${id}`).catch((e) => {
      console.error("Error", e);
    });
    alert("Delete");
  };
  return (
    <div>
      <div className="search-box">
        <button className="btn-search-delete">
          <i className="fasfa-search"></i>
        </button>
        <input
          type="submit"
          className="input-search"
          value="Supprimer PDF"
          onClick={handleSubmission}
        />
      </div>
    </div>
  );
}

export default Deleter;
