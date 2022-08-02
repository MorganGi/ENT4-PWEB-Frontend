import React, { useState, useEffect } from "react";
import axios from "axios";
import S2 from "./S2";
import UpdateComponent from "./Update.component";
import CreateComponent from "./Create.component";
import DeleteComponent from "./Delete.component";

function S1({ id, admin }) {
  const [isSet, setisSet] = useState(false);
  const [focusedlist, setfocusedlist] = useState();
  const [symps, setSymp] = useState([]);
  const uri = `http://localhost:8080/s1/${id}`;
  const [isModify, setisModify] = useState(false);
  const [a, setA] = useState([]);

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

  return (
    <div className="s1">
      {symps.map((symp, i) => (
        <div className="" key={symp.id_s1}>
          <div className="container-s1">
            {symp.title_s1}
            <button
              className="fleche"
              value={symp.id_s1}
              onClick={(e) => choixPb(e, i)}
            ></button>
            {admin && (
              <button
                className="ecrou"
                value={symp.id_s1}
                onClick={(e) => {
                  setisModify(!isModify);
                  setfocusedlist(e.target.value);
                }}
              ></button>
            )}
            {isModify && focusedlist === `${symp.id_s1}` && (
              <div className="main_crud">
                <UpdateComponent
                  id={symp.id_s1}
                  title={symp.title_s1}
                  base={"s1"}
                  champ={"title_s1"}
                />

                <CreateComponent
                  id={symp.id_s1}
                  title={symp.title_s2}
                  champ={"title_s2"}
                  champ2={"ind_s1"}
                  base={"s2"}
                />
                <DeleteComponent
                  id={symp.id_s1}
                  base={"s1"}
                  champ={"id_s1"}
                  name={symp.title_s1}
                />
              </div>
            )}
          </div>
          {a[i] === `${symp.id_s1}` ? (
            <div>
              <S2 id_s1={symp.id_s1} admin={admin} />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default S1;
