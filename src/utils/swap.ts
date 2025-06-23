import { getERC20Contract, getExchangeContract } from "../lib/contract";
import { ethers, parseUnits, BrowserProvider } from "ethers";
import { CONTRACTS } from "../constants";

export async function performSwap(
  fromToken: string,
  toToken: string,
  amount: string // human-readable
) {
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const fromTokenAddress = CONTRACTS.tokens[fromToken];
  const exchange = getExchangeContract(signer);
  const token = getERC20Contract(fromTokenAddress, signer);

  const amountIn = parseUnits(amount, 18);

  // Step 1: Approve exchange contract
  const approvalTx = await token.approve(CONTRACTS.exchange, amountIn);
  await approvalTx.wait();

  // Step 2: Call swap
  const swapTx = await exchange.swap(fromToken, toToken, amountIn);
  await swapTx.wait();

  return true;
}
