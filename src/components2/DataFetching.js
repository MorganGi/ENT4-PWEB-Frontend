import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/DataFetching.css";
import S1 from "./S1";
import UpdateComponent from "./Update.component";
import CreateComponent from "./Create.component";
import DeleteComponent from "./Delete.component";

function DataFetching({ admin }) {
  const [isSet, setisSet] = useState(false);
  const [focusedlist, setfocusedlist] = useState();
  const [posts, setPosts] = useState([]);
  const [isModify, setisModify] = useState(false);

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

  function choixPb(e) {
    setisSet(!isSet);
    setfocusedlist(e.target.value);
  }

  return (
    <div className="faq-list-pb">
      {posts.map(({ id, title_pb }) => (
        <div key={id} className="mainpb">
          {" "}
          {title_pb}
          <div className="main2">
            <button
              className="fleche"
              value={id}
              onClick={(e) => choixPb(e)}
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
          </div>
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
              <DeleteComponent id={id} base={"pb"} champ={"id"} />
            </div>
          )}
          {isSet && focusedlist === `${id}` ? (
            <div className="choix-main">
              <S1 id={id} admin={admin} />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default DataFetching;
