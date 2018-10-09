import Web3 from 'web3';
import { address, ABI } from './constants/rockPaperScissorsContract';

const getContract = new Promise(((resolve) => {
  const web3 = new Web3(window.web3.currentProvider);
  const ethPaperScissorsContractInstance = new web3.eth.Contract(ABI, address);
  // ethPaperScissorsContractInstance = () => ethPaperScissorsContractInstance
  resolve(ethPaperScissorsContractInstance);
}));

export default getContract;
