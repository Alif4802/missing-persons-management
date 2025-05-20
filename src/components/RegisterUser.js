import React, { useState } from 'react';
import web3 from '../ethereum/provider';
import contract from '../ethereum/contract';

function RegisterUser({ onRegister, roles }) {
  const [nid, setNid] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('1');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.registerUser(nid, name, role).send({ from: accounts[0] });
      onRegister(nid, name, role);
      alert('Registration successful!');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please check your inputs and try again.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register as User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>National ID:</label>
          <input 
            type="text" 
            value={nid} 
            onChange={(e) => setNid(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
          >
            {roles.map((roleName, index) => (
              <option key={index} value={index}>
                {roleName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
  );
}

export default RegisterUser;