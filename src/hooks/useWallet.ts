import { useState, useEffect } from "react";
import { ethers, BrowserProvider } from "ethers";
import { getExchangeContract } from "../lib/contract";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export function useWallet() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [address, setAddress] = useState<string>("");

  const connectWallet = async () => {
    if (window.ethereum) {
      const _provider = new BrowserProvider(window.ethereum);
      await _provider.send("eth_requestAccounts", []);
      const _signer = await _provider.getSigner();
      const _address = await _signer.getAddress();

      setProvider(_provider);
      setSigner(_signer);
      setAddress(_address);
    } else {
      alert("Please install MetaMask!");
    }
  };

  const contract = signer ? getExchangeContract(signer) : null;

  return { provider, signer, address, connectWallet, contract };
}
