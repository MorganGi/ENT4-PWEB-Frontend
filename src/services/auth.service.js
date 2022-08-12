import axios from "axios";
const IP = "192.168.1.94";
const API_URL = `http://${IP}:8080/api/auth/`;
class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, email, password, roles) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      roles,
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}
export default new AuthService();
