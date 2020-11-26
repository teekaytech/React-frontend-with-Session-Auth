import Axios from 'axios';
import React from 'react'
import Login from './auth/Login';
import Registration from './auth/Registration'

function Home(props) {
  const handleSuccessReg = data => {
    //Todo: update parent app component
    props.handleLogin(data);
    // redirect user to dashboard page
    props.history.push('/dashboard');
  }

  const handleLogoutClick = () => {
    Axios.delete('http://localhost:3001/logout', { withCredentials: true})
      .then(response => {
        props.handleLogout();
        console.log(response.data)
      })
      .catch(error => {
        console.log('Logout error: ', error.message)
      })
  }

  return (
    <div>
      <h1>Home</h1>
      <h1>Status: {props.loggedInStatus}</h1>
      <button onClick={() => handleLogoutClick()}>Logout</button>
      <Registration handleSuccessReg={handleSuccessReg} />
      <Login handleSuccessReg={handleSuccessReg}/>
    </div>
  );
}

export default Home
