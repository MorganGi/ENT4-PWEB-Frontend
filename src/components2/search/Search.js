import axios from "axios";
import React, { useState } from "react";
import Pdf from "../pdf/Pdf";

function Search() {
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
    <div>
      <form method="POST" action="#" id="#" onSubmit={handleSubmission}>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => recherche(e)}
        />
        <input className="" type="submit" />
      </form>

      {!defaulte ? (
        texts.map((post, i) => (
          <div key={i}>
            <h1>{post.titre}</h1> {post.text}
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
              <div>
                <Pdf file={"/pdf/" + post.titre} />{" "}
              </div>
            )}
          </div>
        ))
      ) : (
        <div>{defaulte}</div>
      )}
    </div>
  );
}
export default Search;
