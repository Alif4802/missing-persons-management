import React from 'react';

function Login({ connectWallet }) {
  return (
    <div className="login-container">
      <h1>Missing Persons Management System</h1>

      <p>Connect to MetaMask to access the application</p>
      <button onClick={connectWallet} className="connect-button">Connect to MetaMask</button>
    </div>
  );
}

export default Login;