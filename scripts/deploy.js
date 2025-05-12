const { ethers } = require('ethers');
const fs = require('fs');

async function main() {
  const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545'); // Ganache RPC URL
  const signer = provider.getSigner();

  // Load the contract ABI and bytecode
  const contractABI = require('../src/contractABI.json');
  const contractBytecode = fs.readFileSync('./build/contractBytecode.json', 'utf8');

  // Deploy the contract
  const ContractFactory = new ethers.ContractFactory(contractABI, contractBytecode, signer);
  const contract = await ContractFactory.deploy();

  console.log('Contract deployed at:', contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
