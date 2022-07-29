import axios from "axios";
import React, { useState } from "react";
import Pdf from "../pdf/Pdf";
import "./searche.css";
import SearchIcon from "@mui/icons-material/Search";

function Searche() {
  const [searched, setSearched] = useState("");
  const [texts, setText] = useState([]);
  const [focusedlist, setfocusedlist] = useState();
  const [isModify, setisModify] = useState(false);
  const [defaulte, setDefaulte] = useState("");

  const handleSubmission = (e) => {
    e.preventDefault();
    if (searched !== "") {
      axios
        .get(`http://localhost:8080/extract-text/${searched}`)
        .then((res) => {
          console.log(res);
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
              placeholder="Type to Search..."
              onChange={(e) => recherche(e)}
            />
          </div>
        </form>
      </div>

      {!defaulte ? (
        texts.map((post, i) => (
          <div key={i} className="res-of-search">
            <h3>{post.titre}</h3> {post.text}
            <br />
            <button
              value={i}
              onClick={(e) => {
                setisModify(!isModify);
                setfocusedlist(e.target.value);
              }}
            >
              Voir cet article
            </button>
            {isModify && focusedlist === `${i}` && (
              <div className="position-pdf">
                <Pdf file={"/pdf/" + post.titre} />{" "}
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
