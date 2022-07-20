import React from "react";
import axios from "axios";

export default class CreateComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.updatee(
      this.state.value,
      this.props.base,
      this.props.id,
      this.props.champ,
      this.props.champ2
    );
  }

  updatee(e, db, id, champ, champ2) {
    axios
      .put(`http://localhost:8080/create/${db}&${id}&${e}&${champ}&${champ2}`)
      .then((res) => {
        console.log("PUTting : ", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Create Symptôme
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Envoyer" />
      </form>
    );
  }
}
