import Portis from "@portis/web3";
import Web3 from "web3";

let web3;

const portis = new Portis("093f6f84-68a3-4831-9eea-113d337137e4", {
  nodeUrl: "HTTP://127.0.0.1:8545",
});
web3 = new Web3(portis.provider);
export default web3;
