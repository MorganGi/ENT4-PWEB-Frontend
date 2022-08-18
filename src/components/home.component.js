import React, { Component } from "react";
import UserService from "../services/user.service";
import "../components2/DataFetching.js";
import axios from "axios";
import imageWisper from "../styles/wisper.png";
import imageXivo from "../styles/xivo.svg";
import imageCebox from "../styles/cebox.svg";
import "../styles/home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
    axios.get("http://10.21.21.2:8080/").then((res) => {
      console.log(res);
    });
  }
  componentDidMount() {
    UserService.getPublicContent().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }
  render() {
    return (
      <div className="container">
        <div className="main">
          <div className="wisper">
            <img src={imageWisper} />
          </div>
          <div className="xivo-cebox">
            <img src={imageCebox} />
            <img src={imageXivo} />
          </div>
        </div>
      </div>
    );
  }
}
