import React from "react";
import axios from "axios";
const IP = "192.168.18.141";

function Deleter({ id, from }) {
  const handleSubmission = (e) => {
    axios.get(`http://${IP}:8080/solutions/del/${id}&${from}`).catch((e) => {
      console.error("Error", e);
    });
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
