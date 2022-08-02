import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logo from "./styles/xivo.png";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import DataFetching from "./components2/DataFetching";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }
  logOut() {
    AuthService.logout();
  }
  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    return (
      <div>
        <nav className="navbar-main">
          <Link to={"/"} className="logo">
            <img src={logo} alt="image" className="logo-png" />
          </Link>
          <div className="navbar-div">
            <li className="navbar-item">
              <Link to={"/home"} className="navbar-link">
                Accueil
              </Link>
            </li>
            {showModeratorBoard && (
              <li className="navbar-item">
                <Link to={"/mod"} className="navbar-link">
                  Espace Moderateur
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="navbar-item">
                <Link to={"/admin"} className="navbar-link">
                  Espace admin
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="navbar-item">
                <Link to={"/user"} className="navbar-link">
                  Utilisateur
                </Link>
              </li>
            )}

            {currentUser ? (
              <div className="">
                <li className="navbar-item">
                  <Link to={"/profile"} className="navbar-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="navbar-item">
                  <a
                    href="/login"
                    className="navbar-link"
                    onClick={this.logOut}
                  >
                    Déconnexion
                  </a>
                </li>
              </div>
            ) : (
              <div className="">
                <li className="navbar-item">
                  <Link to={"/login"} className="navbar-link">
                    S'identifier
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to={"/register"} className="navbar-link">
                    S'enregistrer
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to={"/faq"} className="navbar-link">
                    FAQ
                  </Link>
                </li>
              </div>
            )}
          </div>
        </nav>

        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/user" component={BoardUser} />
          <Route path="/mod" component={BoardModerator} />
          <Route path="/admin" component={BoardAdmin} />
          <Route path="/faq" component={DataFetching} />
        </Switch>
      </div>
    );
  }
}
export default App;
