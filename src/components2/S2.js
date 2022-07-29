import React, { useState, useEffect } from "react";
import axios from "axios";
import Solutions from "./Solutions";
import UpdateComponent from "./Update.component";

import Uploader from "./Uploader";
import Deleter from "./Deleter";

function S2({ id_s1, admin }) {
  const [symps, setSymp] = useState([]);
  const [isSet, setisSet] = useState(false);
  const [focusedlist, setfocusedlist] = useState();
  const [isModify, setisModify] = useState(false);
  const [a, setA] = useState([]);

  const uri = `http://localhost:8080/s2/${id_s1}`;

  function choixPb(e, i) {
    setisSet(!isSet);
    setfocusedlist(e.target.value);
    const newA = a;
    if (newA[i] === e.target.value) {
      newA[i] = 0;
    } else {
      newA[i] = e.target.value;
      setA(newA);
    }
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
      <div className="s2">
        {symps.map((symp, i) => (
          <div className="main" key={symp.id_s2}>
            <div className="container-s2">
              {symp.title_s2}
              <button
                className="fleche"
                value={symp.id_s2}
                onClick={(e) => choixPb(e, i)}
              ></button>
              {admin && (
                <button
                  className="ecrou"
                  value={symp.id_s2}
                  onClick={(e) => {
                    setisModify(!isModify);
                    setfocusedlist(e.target.value);
                  }}
                ></button>
              )}
              {isModify && focusedlist === `${symp.id_s2}` && (
                <div className="main_crud">
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
                  <Uploader id={symp.id_s2} />
                  <Deleter id={symp.id_s2} />
                </div>
              )}
            </div>
            {a[i] === `${symp.id_s2}` ? (
              <div className="solution">
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
