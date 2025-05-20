import web3 from './provider';
import ABI from '../contractABI';

const address = process.env.REACT_APP_CONTRACT_ADDRESS;

const contract = new web3.eth.Contract(ABI, address);

export default contract;
