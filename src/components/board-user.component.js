import React, { Component } from "react";
import UserService from "../services/user.service";
import DataFetching from "../components2/DataFetching";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
  }
  componentDidMount() {
    UserService.getUserBoard().then(
      (response) => {
        console.log(response);
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
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
          <h3>{this.state.content}</h3>
          <DataFetching admin={true} />
        </header>
      </div>
    );
  }
}
