import { ethers } from "ethers";
import ExchangeABI from "../abis/CryptoArenaExchange.json";
import ERC20Artifact from "../abis/ERC20.json";
import { CONTRACTS } from "../constants";

const ERC20ABI = ERC20Artifact.abi;

export function getExchangeContract(signerOrProvider: any) {
  return new ethers.Contract(CONTRACTS.exchange, ExchangeABI.abi, signerOrProvider);
}

export function getERC20Contract(tokenAddress: string, signerOrProvider: any) {
  return new ethers.Contract(tokenAddress, ERC20ABI, signerOrProvider);
}
