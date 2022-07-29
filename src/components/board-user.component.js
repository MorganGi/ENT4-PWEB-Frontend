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
        this.setState({
          content: response.data,
        });
        console.log(response.data);
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
      <div className="">
        <header className="">
          <DataFetching admin={true} />
        </header>
      </div>
    );
  }
}
