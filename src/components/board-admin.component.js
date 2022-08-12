import React from "react";
import UserManager from "../components2/user-manager/user-manager.component";
import Register from "./register.component";
import "../styles/manager.css";

export default function BoardAdmin() {
  return (
    <div className="admin-container">
      <div className="admin-container-g">
        <h1>Creer un compte</h1>
        <Register />
      </div>
      <div className="admin-container-d">
        <UserManager />
      </div>
    </div>
  );
}
