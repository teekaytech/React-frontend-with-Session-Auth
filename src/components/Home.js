import React from 'react'
import Registration from './auth/Registration'

function Home(props) {
  const handleSuccessReg = data => {
    //Todo: update parent app component
    props.handleLogin(data);
    // redirect user to dashboard page
    props.history.push('/dashboard');
  }

  return (
    <div>
      <h1>Home</h1>
      <h1>Status: {props.loggedInStatus}</h1>
      <Registration handleSuccessReg={handleSuccessReg} />
    </div>
  );
}

export default Home
