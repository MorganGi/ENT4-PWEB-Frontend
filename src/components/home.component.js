import React, { Component } from "react";
import UserService from "../services/user.service";
import "../components2/DataFetching.js";
import axios from "axios";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
    axios.get("http://192.168.1.94:8080/").then((res) => {
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
        <header className="jumbotron">
          <h3>{this.state.content} </h3>
        </header>
      </div>
    );
  }
}
