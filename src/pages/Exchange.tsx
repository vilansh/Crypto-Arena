import { useState } from "react";
import { useWallet } from "../hooks/useWallet";
import { ethers } from "ethers";

const Exchange = () => {
  const { address, connectWallet, contract } = useWallet();
  const [amount, setAmount] = useState("");

  const handleDeposit = async () => {
    if (!contract) return;
    try {
      const tx = await contract.deposit({
        value: ethers.utils.parseEther(amount),
      });
      await tx.wait();
      alert("✅ Deposit successful!");
    } catch (err) {
      alert("❌ Deposit failed.");
    }
  };

  const handleWithdraw = async () => {
    if (!contract) return;
    try {
      const tx = await contract.withdraw(ethers.utils.parseEther(amount));
      await tx.wait();
      alert("✅ Withdraw successful!");
    } catch (err) {
      alert("❌ Withdraw failed.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      {!address ? (
        <button onClick={connectWallet} className="bg-blue-600 text-white px-4 py-2 rounded">
          Connect Wallet
        </button>
      ) : (
        <p className="text-gray-700 font-medium">Connected: {address}</p>
      )}

      <input
        type="number"
        placeholder="Amount (in ETH)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />

      <div className="flex space-x-4">
        <button onClick={handleDeposit} className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Buy (Deposit)
        </button>
        <button onClick={handleWithdraw} className="bg-red-600 text-white px-4 py-2 rounded w-full">
          Sell (Withdraw)
        </button>
      </div>
    </div>
  );
};

export default Exchange;
