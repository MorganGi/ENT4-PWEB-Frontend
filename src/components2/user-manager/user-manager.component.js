import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/manager.css";

function UserManager() {
  const [users, setUsers] = useState([]);
  const [info, setInfo] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function delUser(e) {
    axios
      .post(`http://192.168.1.94:8080/api/del/user/${e.target.value}`)
      .then(() => {
        setInfo(!info);
        setTimeout(() => {
          setInfo(!info);
        }, 5000);
      });
  }

  useEffect(() => {
    axios.get("http://192.168.1.94:8080/api/get/users").then((res) => {
      const tabUsers = res.data.map((item) => item);
      setUsers(tabUsers);
    });
  }, [delUser]);

  return (
    <div className="manager-container">
      <div className="manager-info">
        <div className="manager-user-info">USERS</div>
        <div className="manager-roles-info">
          <div>ROLES</div>
        </div>
        <button
          className="manager-del-user-info"
          type="button"
          placeholder="Supprimer"
        >
          Action
        </button>
      </div>
      {users.map((item, i) => (
        <div>
          {item.username === "admin" ? (
            <div className="manager">
              <div className="manager-user" key={i}>
                {item.username}
              </div>
              <div className="manager-roles">
                {item.roles.map((roles) => (
                  <div key={roles.id} className="manager-roles-child">
                    {roles.name}
                  </div>
                ))}
              </div>

              <button
                key={item.id}
                className="manager-del-user-admin"
                type="button"
                value={item.id}
                placeholder="Supprimer"
              >
                Supprimer
              </button>
            </div>
          ) : (
            <div className="manager">
              <div className="manager-user" key={i}>
                {item.username}
              </div>
              <div className="manager-roles">
                {item.roles.map((roles) => (
                  <div key={roles.id} className="manager-roles-child">
                    {roles.name}
                  </div>
                ))}
              </div>

              <button
                key={item.id}
                className="manager-del-user"
                type="button"
                value={item.id}
                placeholder="Supprimer"
                onClick={(e) => {
                  delUser(e);
                }}
              >
                Supprimer
              </button>
            </div>
          )}
        </div>
      ))}
      {info && (
        <div className="alert alert-success">
          Utilisateur supprimé avec Succès
        </div>
      )}
    </div>
  );
}

export default UserManager;
