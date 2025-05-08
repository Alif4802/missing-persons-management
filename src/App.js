// src/App.js

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';
import contractABI from './contractABI';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import RegisterUser from './components/RegisterUser';
import AddMissingPerson from './components/AddMissingPerson';
import CasesList from './components/CasesList';
import AppointmentBooking from './components/AppointmentBooking';
import AdminPanel from './components/AdminPanel';

const CONTRACT_ADDRESS = '0xd9145CCE52D386f254917e481eB44e9943F39138';

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  // Enum mappings for display
  const roles = ['Admin', 'Reporter', 'Investigator'];
  const statuses = ['Missing', 'Found'];
  const urgencyLevels = ['High', 'Medium', 'Low'];
  const timeSlots = ['9:00-10:00 AM', '10:30-11:30 AM', '12:00-1:00 PM', '2:00-3:00 PM', '3:30-4:30 PM', '5:00-6:00 PM'];

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          // Request account access
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          const currentAccount = accounts[0];
          setAccount(currentAccount);

          // Set up ethers
          const ethProvider = new ethers.providers.Web3Provider(window.ethereum);

          // Create contract instance
          const missingPersonsContract = new ethers.Contract(
            CONTRACT_ADDRESS,
            contractABI,
            ethProvider.getSigner()
          );
          setContract(missingPersonsContract);

          // Check if user is registered
          const userRegistered = await missingPersonsContract.isUserRegistered(currentAccount);
          setIsRegistered(userRegistered);

          if (userRegistered) {
            const user = await missingPersonsContract.users(currentAccount);
            setUserRole(user.role);
            setUserName(user.name);
          }

          setLoading(false);
        } catch (error) {
          console.error("Error initializing app:", error);
          setLoading(false);
        }
      } else {
        console.log("No Ethereum browser extension detected");
        setLoading(false);
      }
    };

    init();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0]);
        window.location.reload();
      });
    }
  }, []);

  const handleRegister = async (nid, name, role) => {
    try {
      setLoading(true);

      if (!contract) {
        throw new Error('Contract is not initialized.');
      }

      const tx = await contract.registerUser(nid, name, parseInt(role));
      await tx.wait();

      setIsRegistered(true);
      setUserRole(parseInt(role));
      setUserName(name);
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Registration failed. Please check your inputs and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!account) {
    return (
<Login
connectWallet={() => {
          if (window.ethereum) {
window.ethereum
.request({ method: 'eth_requestAccounts' })
              .then((accounts) => setAccount(accounts[0]))
              .catch((error) => console.error('Error connecting wallet:', error));
          } else {
            alert('No Ethereum browser extension detected. Please install MetaMask.');
          }
        }}
      />
    );
  }

  if (!isRegistered) {
    return <RegisterUser onRegister={handleRegister} roles={roles} />;
  }

  return (
    <div className="App">
      <header>
        <h1>Missing Persons Management System</h1>
        <div className="user-info">
          <p>Connected: {account.substring(0, 6)}...{account.substring(account.length - 4)}</p>
          <p>Role: {roles[userRole]}</p>
          <p>Name: {userName}</p>
        </div>
      </header>
      
      <Dashboard 
        userRole={userRole} 
        contract={contract} 
        account={account}
        roles={roles}
        statuses={statuses}
        urgencyLevels={urgencyLevels}
        timeSlots={timeSlots}
      />
    </div>
  );
}

export default App;