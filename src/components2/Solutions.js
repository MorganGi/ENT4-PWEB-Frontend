import React, { useState, useEffect } from "react";
import axios from "axios";
import Pdf from "./pdf/Pdf";

function Solutions({ id_s2 }) {
  const [symps, setSymp] = useState([]);

  const uri = `http://localhost:8080/solutions/${id_s2}`;

  useEffect(() => {
    axios
      .get(uri)
      .then((res) => {
        setSymp(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="faq-list-s2">
      {symps.map((symp) => (
        <div key={symp.id_s2}>
          <Pdf file={"/pdf/" + symp.text} />{" "}
        </div>
      ))}
    </div>
  );
}

export default Solutions;
