import api from "./api.js";

import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://10.21.21.2:8080/api/test/";
const getPublicContent = () => {
  return api.get("/test/all");
};
const getUserBoard = () => {
  return api.get("/test/user");
};
const getModeratorBoard = () => {
  return api.get("/test/mod");
};
const getAdminBoard = () => {
  return api.get("/test/admin");
};
const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};
export default UserService;
