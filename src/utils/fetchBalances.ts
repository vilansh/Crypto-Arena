import { getERC20Contract } from "../lib/contract";
import { CONTRACTS } from "../constants";
import { formatUnits, BrowserProvider } from "ethers";

export async function fetchBalances(address: string) {
  const balances: Record<string, string> = {};
  const provider = new BrowserProvider(window.ethereum);

  for (const [symbol, tokenAddress] of Object.entries(CONTRACTS.tokens)) {
    const contract = getERC20Contract(tokenAddress, provider);
    const balance = await contract.balanceOf(address);
    balances[symbol] = formatUnits(balance, 18);
  }

  return balances;
}
