import React, { Component } from 'react'
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loginErrors: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();
    const {email, password} = this.state;
    axios.post('http://localhost:3001/sessions', {
      user: {
        email: email,
        password: password,
      }
    }, {
      withCredentials: true
    })
      .then(response => {
        console.log('Login response', response.data)
        //if Login is successful, return data as prop to parent. Else, populate error message
        if (response.data.logged_in) {
          this.props.handleSuccessReg(response.data)
        } else {
          this.setState({
            loginErrors: 'Problem with Login, try again.'
          })
        }
      })
      .catch(error => {
        console.log('Login error: ', error)
      })
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
            type="email"
            name="email"
            placeholder="Enter mail here"
            value={this.state.email}
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
