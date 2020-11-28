import React, { Component } from 'react'
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loginErrors: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();
    const {username, password} = this.state;
    axios
      .post("https://aqueous-scrubland-23856.herokuapp.com/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log("Login response", response.data);
        //if Login is successful, return data as prop to parent. Else, populate error message
        if (response.data.status === "logged_in") {
          localStorage.setItem("token", response.data.jwt);
          this.props.handleSuccessReg(response.data);
        } else {
          this.setState({
            loginErrors: response.data.failure,
          });
        }
      })
      .catch((error) => {
        console.log("Login error: ", error);
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
            type="text"
            name="username"
            placeholder="Enter mail here"
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

          <button>Login</button>
        </form>
      </div>
    );
  }
}
