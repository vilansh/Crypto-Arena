import { useWallet } from "../hooks/useWallet";
import { Button } from "./ui/button";

const Header = () => {
  const { address, connectWallet } = useWallet();

  return (
    <header className="w-full flex justify-between items-center p-4 bg-gray-900 text-white">
      <div className="font-bold text-xl">Crypto Arena</div>
      {!address ? (
        <Button onClick={connectWallet} className="brutal-button chaos-sell h-16 text-lg">
          Connect Wallet
        </Button>
      ) : (
        <span>Connected: {address.slice(0, 6)}...{address.slice(-4)}</span>
      )}
    </header>
  );
};

export default Header;
