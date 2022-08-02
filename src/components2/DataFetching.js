import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/DataFetching.css";
import logo from "../styles/pdf.png";
import S1 from "./S1";
import UpdateComponent from "./Update.component";
import CreateComponent from "./Create.component";
import DeleteComponent from "./Delete.component";
import Searche from "./search/Search";
// import AuthService from "../services/auth.service";

function DataFetching({ admin }) {
  const [isSet, setisSet] = useState(false);
  const [focusedlist, setfocusedlist] = useState();
  const [posts, setPosts] = useState([]);
  const [isModify, setisModify] = useState(false);
  const [a, setA] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/pb/")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
    <div className="master">
      <div className="faq-list-pb">
        <Searche />
        {posts.map(({ id, title_pb }, i) => (
          <div key={id} className="mainpb">
            {" "}
            <div className="container-pb">
              {title_pb}
              <button
                className="fleche"
                value={id}
                onClick={(e) => choixPb(e, i)}
              ></button>
              {admin && (
                <button
                  className="ecrou"
                  value={id}
                  onClick={(e) => {
                    setisModify(!isModify);
                    setfocusedlist(e.target.value);
                  }}
                ></button>
              )}
              {isModify && focusedlist === `${id}` && (
                <div className="main_crud">
                  <UpdateComponent
                    id={id}
                    title={title_pb}
                    base={"pb"}
                    champ={"title_pb"}
                  />
                  <CreateComponent
                    id={id}
                    base={"s1"}
                    champ={"title_s1"}
                    champ2={"ind_pb"}
                    title={title_pb}
                  />
                  <DeleteComponent
                    id={id}
                    base={"pb"}
                    champ={"id"}
                    name={title_pb}
                  />
                </div>
              )}
            </div>
            {a[i] === `${id}` ? (
              <div className="choix-main">
                <S1 id={id} admin={admin} />
              </div>
            ) : null}
          </div>
        ))}
        {admin && (
          <div className="main-create">
            <CreateComponent
              id={"1"}
              base={"pb"}
              champ={"title_pb"}
              champ2={"null"}
              title={"a"}
            />
          </div>
        )}
      </div>
      <div className="faq-list-pb2"></div>
    </div>
  );
}

export default DataFetching;
