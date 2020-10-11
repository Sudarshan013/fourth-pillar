import web3 from './web3';
import main from '../abis/main';
let instance;

if(web3!=="Not_Found"){
instance = new web3.eth.Contract(
    main.abi,
    '0xdFa0B79838d116820656BADD51675C43498c4b50'
  );
}
else{
    instance=web3;
}

export default instance;
