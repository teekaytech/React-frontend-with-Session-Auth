import React, { Component } from 'react'
import axios from "axios";

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      registrationErrors: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();
    const {username, password} = this.state;
    axios
      .post("https://aqueous-scrubland-23856.herokuapp.com/users", {
        username: username,
        password: password,
      })
      .then((response) => {
        // if registration is successful, return data as prop to parent. Else, populate error message
        if (response.data.status === "created") {
          localStorage.setItem("token", response.data.jwt);
          this.props.handleSuccessReg(response.data.user);
        } else {
          this.setState({
            registrationErrors: response.data.errors,
          });
        }
      })
      .catch((error) => {
        console.log("Registration error: ", error);
      });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="username"
            name="username"
            placeholder="Enter username here"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password here"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <button>Register</button>
        </form>
      </div>
    );
  }
}
