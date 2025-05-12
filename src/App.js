import React, { useState, useEffect } from 'react';
import { JsonRpcProvider, Contract } from 'ethers'; // Updated imports
import './App.css';
import contractABI from './contractABI';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import RegisterUser from './components/RegisterUser';

const CONTRACT_ADDRESS = '0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8'; // Updated with the deployed contract address from Remix IDE

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  const roles = ['Admin', 'Reporter', 'Investigator'];
  const statuses = ['Missing', 'Found'];
  const urgencyLevels = ['High', 'Medium', 'Low'];
  const timeSlots = ['9:00-10:00 AM', '10:30-11:30 AM', '12:00-1:00 PM', '2:00-3:00 PM', '3:30-4:30 PM', '5:00-6:00 PM'];

  useEffect(() => {
    const init = async () => {
      try {
        if (!window.ethereum) {
          throw new Error('MetaMask is not installed. Please install MetaMask and try again.');
        }

        // Request accounts from MetaMask
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const currentAccount = accounts[0];
        setAccount(currentAccount);

        // Connect to the Ganache network
        const provider = new JsonRpcProvider('http://127.0.0.1:8545'); // Ganache default RPC URL
        const missingPersonsContract = new Contract(
          CONTRACT_ADDRESS,
          contractABI,
          provider.getSigner()
        );
        setContract(missingPersonsContract);

        const userRegistered = await missingPersonsContract.isUserRegistered(currentAccount);
        setIsRegistered(userRegistered);

        if (userRegistered) {
          const user = await missingPersonsContract.users(currentAccount);
          setUserRole(user.role);
          setUserName(user.name);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error initializing app:', error);
        setLoading(false);
      }
    };

    init();
  }, []);

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
        connectWallet={async () => {
          try {
            if (!window.ethereum) {
              throw new Error('MetaMask is not installed. Please install MetaMask and try again.');
            }

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(accounts[0]); // Use the first account
          } catch (error) {
            console.error('Error connecting to MetaMask:', error);
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