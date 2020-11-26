import './App.css';
import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    };

    this.checkLoginStatus = this.checkLoginStatus.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin = (data) => {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user,
    });
  };

  checkLoginStatus = () => {
    Axios.get('http://localhost:3001/logged_in', { withCredentials: true})
      .then(response => {
        if (
          response.data.logged_in &&
          this.state.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: response.data.user,
          });
        } else if (!response.data.logged_in && this.state.loggedInStatus === 'LOGGED_IN') {
          this.setState({
            loggedInStatus: 'NOT_LOGGED_IN',
            user: {}
          })
        }

      })
      .catch(error => {
        console.log('validating logged_in error: ', error)
      })
  };

  componentDidMount() {
    this.checkLoginStatus();
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Home
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                  handleLogin={this.handleLogin}
                />
              )}
            />
            <Route
              exact
              path="/dashboard"
              render={(props) => (
                <Dashboard
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
