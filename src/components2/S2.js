import React, { useState, useEffect } from "react";
import axios from "axios";
import Solutions from "./Solutions";
import UpdateComponent from "./Update.component";
import CreateComponent from "./Create.component";
import DeleteComponent from "./Delete.component";
import Uploader from "./Uploader";
import Deleter from "./Deleter";

function S2({ id_s1, admin }) {
  const [symps, setSymp] = useState([]);
  const [isSet, setisSet] = useState(false);
  const [focusedlist, setfocusedlist] = useState();
  const [isModify, setisModify] = useState(false);

  const uri = `http://localhost:8080/s2/${id_s1}`;

  function choixPb(e) {
    setisSet(!isSet);
    setfocusedlist(e.target.value);
  }

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

  const categories = symps.reduce(
    (acc, symp) =>
      acc.includes(symp.title_s2) ? acc : acc.concat(symp.title_s2),
    []
  );

  if (categories.length === 0) {
    return (
      <div>
        <p>pas de symptome N°2</p>
      </div>
    );
  } else {
    return (
      <div className="faq-list-s2">
        {symps.map((symp) => (
          <div key={symp.id_s2}>
            {symp.title_s2}
            <button
              className="button"
              value={symp.id_s2}
              onClick={(e) => choixPb(e)}
            >
              Choix
            </button>
            {admin && (
              <button
                className="button"
                value={symp.id_s2}
                onClick={(e) => {
                  setisModify(!isModify);
                  setfocusedlist(e.target.value);
                }}
              >
                Modifier
              </button>
            )}
            {isModify && focusedlist === `${symp.id_s2}` && (
              <div>
                <UpdateComponent
                  id={symp.id_s2}
                  title={symp.title_s2}
                  base={"s2"}
                  champ={"title_s2"}
                />

                {/* <CreateComponent
                  id={symp.id_s2}
                  title={symp.text}
                  champ={"text"}
                  champ2={"ind_s2"}
                  base={"solutions"}
                /> */}
                <DeleteComponent id={symp.id_s2} base={"s2"} champ={"id_s2"} />
                <Uploader id={symp.id_s2} />
                <Deleter id={symp.id_s2} />
              </div>
            )}
            {isSet && focusedlist === `${symp.id_s2}` ? (
              <div>
                <Solutions id_s2={symp.id_s2} />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    );
  }
}

export default S2;
