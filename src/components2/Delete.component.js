import React from "react";
import axios from "axios";

export default class DeleteComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.updatee(this.props.id, this.props.base, this.props.champ);
  }

  updatee(id, db, champ) {
    axios
      .put(`http://localhost:8080/delete/${id}&${db}&${champ}`)
      .then((res) => {
        console.log("PUTting : ", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  butDelete(e) {
    console.log(e.target.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="submit" value="Delete" />
      </form>
    );
  }
}
