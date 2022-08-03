import axios from "axios";
import React, { useState } from "react";
import Pdf from "../pdf/Pdf";
import "./searche.css";

function Searche() {
  const [searched, setSearched] = useState("");
  const [texts, setText] = useState([]);
  const [focusedlist, setfocusedlist] = useState();
  const [defaulte, setDefaulte] = useState("");

  const [a, setA] = useState([]);
  const [isModify, setisModify] = useState(false);

  function choixPb(e, i) {
    setfocusedlist(e.target.value);
    const newA = a;
    if (newA[i] === e.target.value) {
      newA[i] = 0;
      setisModify(false);
    } else {
      setisModify(true);
      console.log(newA.length);
      newA[i] = e.target.value;
      for (let j = 0; j < newA.length; j++) {
        if (i === j) {
          console.log("");
        } else {
          newA[j] = 0;
        }
      }
      console.log(newA);
      setA(newA);
    }
  }

  const handleSubmission = (e) => {
    e.preventDefault();
    if (searched !== "") {
      axios
        .get(`http://localhost:8080/extract-text/${searched}`)
        .then((res) => {
          console.log(res.data);
          if (res.data.length === 0) {
            setDefaulte("Aucun article trouvé...");
          } else {
            setDefaulte("");
            setText(res.data);
          }
        });
    } else {
      setDefaulte("Recherche vide.");
    }
  };

  const recherche = (e) => {
    setSearched(e.target.value);
  };

  return (
    <div className="mainDiv-search">
      <div className="formSearch">
        <form method="POST" onSubmit={handleSubmission}>
          <div className="search-box">
            <button className="btn-search">
              <i className="fasfa-search"></i>
            </button>
            <input
              type="text"
              className="input-search"
              placeholder="Recherche"
              onChange={(e) => recherche(e)}
            />
          </div>
        </form>
      </div>

      {!defaulte ? (
        texts.map(({ text, titre, titredoc }, i) => (
          <div key={i} className="res-of-search">
            <h3>{titredoc}</h3>{" "}
            {text.split("AAA").map((res, i) => (
              <li key={i}>{res}</li>
            ))}
            <br />
            <button
              className="button-article"
              value={i}
              onClick={(e) => choixPb(e, i)}
            >
              Voir cet article
            </button>
            {isModify && a[i] === `${i}` && (
              <div className="position-pdf">
                <Pdf file={"/pdf/" + titre} />{" "}
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="res-of-search">{defaulte}</div>
      )}
    </div>
  );
}
export default Searche;
