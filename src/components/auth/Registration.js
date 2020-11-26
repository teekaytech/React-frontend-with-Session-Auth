import React, { Component } from 'react'
import axios from "axios";

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      registrationErrors: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();
    const {email, password, password_confirmation} = this.state;
    axios.post('http://localhost:3001/registrations', {
      user: {
        email: email,
        password: password,
        password_confirmation: password_confirmation
      }
    }, {
      withCredentials: true
    })
      .then(response => {
        //if registration is successful, return data as prop to parent. Else, populate error message
        if (response.data.status === 'created') {
          this.props.handleSuccessReg(response.data)
        } else {
          this.setState({
            registrationErrors: 'Problem with registration, try again.'
          })
        }
      })
      .catch(error => {
        console.log('Registration error: ', error)
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

          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm password here"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />

          <button>Register</button>
        </form>
      </div>
    );
  }
}
