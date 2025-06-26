import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useWallet } from '../hooks/useWallet';
import { ethers } from 'ethers';
import { fetchBalances } from '../utils/fetchBalances';
import { CONTRACTS } from '../constants';
import { getERC20Contract, getExchangeContract } from '../lib/contract';
import { BrowserProvider } from "ethers";
import { fetchLivePrices } from '../utils/fetchPrices';
import { recordTrade } from '../utils/api';

const TradingInterface = () => {
  const { address, connectWallet } = useWallet();
  const [selectedToken, setSelectedToken] = useState('BTC');
  const [action, setAction] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [balances, setBalances] = useState<{ [symbol: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState<any>({});

  const cryptos = [
    { symbol: 'BTC', name: 'BITCOIN', price: prices.bitcoin?.usd ?? 0, color: 'text-orange-400' },
    { symbol: 'ETH', name: 'ETHEREUM', price: prices.ethereum?.usd ?? 0, color: 'text-cyan-400' },
    { symbol: 'DOGE', name: 'DOGECOIN', price: prices.dogecoin?.usd ?? 0, color: 'text-yellow-400' },
    { symbol: 'SHIB', name: 'SHIBA', price: prices['shiba-inu']?.usd ?? 0, color: 'text-pink-400' }
  ];

  useEffect(() => {
    const fetchPricesInterval = async () => {
      const data = await fetchLivePrices();
      setPrices(data);
    };
    fetchPricesInterval();
    const interval = setInterval(fetchPricesInterval, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (address) {
      fetchBalances(address)
        .then(setBalances)
        .catch(() => setBalances({}));
    }
  }, [address]);

  const refreshBalances = async () => {
    if (address) {
      fetchBalances(address)
        .then(setBalances)
        .catch(() => setBalances({}));
    }
  };

  const handleTrade = async () => {
    if (!address) {
      connectWallet();
      return;
    }
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert('Enter a valid amount.');
      return;
    }
    setLoading(true);
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tokenContract = getERC20Contract(CONTRACTS.tokens[selectedToken], signer);
      const exchangeContract = getExchangeContract(signer);
      const tokenDecimals = 18;
      const parsedAmount = ethers.parseUnits(amount, tokenDecimals);
      const price = selectedToken === 'SHIB' ? prices['shiba-inu']?.usd ?? 0 : prices[selectedToken.toLowerCase()]?.usd ?? 0;
      const ETH_ADDRESS = CONTRACTS.tokens['ETH'];
      const TOKEN_ADDRESS = CONTRACTS.tokens[selectedToken];
      if (action === 'buy') {
        // User spends Sepolia ETH to buy selected token
        // Call smart contract swap(ETH_ADDRESS, TOKEN_ADDRESS, amount)
        const swapTx = await exchangeContract.swap(ETH_ADDRESS, TOKEN_ADDRESS, parsedAmount);
        await swapTx.wait();
        alert(`✅ Bought ${amount} ${selectedToken}!`);
        await recordTrade({
          wallet: address,
          token: selectedToken,
          side: 'buy',
          amount: Number(amount),
          price,
          timestamp: new Date().toISOString()
        });
      } else {
        // User sells selected token for Sepolia ETH
        // Approve token if needed
        const allowance = await tokenContract.allowance(address, CONTRACTS.exchange);
        if (allowance < parsedAmount) {
          const approveTx = await tokenContract.approve(CONTRACTS.exchange, parsedAmount);
          await approveTx.wait();
        }
        // Call smart contract swap(TOKEN_ADDRESS, ETH_ADDRESS, amount)
        const swapTx = await exchangeContract.swap(TOKEN_ADDRESS, ETH_ADDRESS, parsedAmount);
        await swapTx.wait();
        alert(`✅ Sold ${amount} ${selectedToken} for ETH!`);
        await recordTrade({
          wallet: address,
          token: selectedToken,
          side: 'sell',
          amount: Number(amount),
          price,
          timestamp: new Date().toISOString()
        });
      }
      await refreshBalances();
    } catch (err) {
      console.error("Trade error:", err);
      alert('❌ Trade failed.');
    }
    setLoading(false);
  };

  const selectedCrypto = cryptos.find(c => c.symbol === selectedToken);

  return (
    <Card className="chaos-card relative overflow-hidden">
      <div className="flex flex-col items-center mb-6">
        <h3 className="text-2xl font-display font-black text-green-400 glitch-text mb-2 neon-glow" data-text="TRADE CRYPTO">
          TRADE CRYPTO
        </h3>
        <div className="flex space-x-2 mb-2">
          <Button
            className={`px-4 py-2 font-bold ${action === 'buy' ? 'bg-green-600 text-white' : 'bg-gray-800 text-green-400'}`}
            onClick={() => setAction('buy')}
            disabled={loading}
          >
            Buy
          </Button>
          <Button
            className={`px-4 py-2 font-bold ${action === 'sell' ? 'bg-red-600 text-white' : 'bg-gray-800 text-red-400'}`}
            onClick={() => setAction('sell')}
            disabled={loading}
          >
            Sell
          </Button>
        </div>
        <div className="flex space-x-2">
          {cryptos.map(c => (
            <Button
              key={c.symbol}
              className={`px-4 py-2 font-bold ${selectedToken === c.symbol ? 'bg-yellow-400 text-black' : 'bg-gray-800 text-yellow-400'}`}
              onClick={() => setSelectedToken(c.symbol)}
              disabled={loading}
            >
              {c.symbol}
            </Button>
          ))}
        </div>
      </div>

      {/* Price Display */}
      <div className="text-center mb-6 p-6 rounded-lg bg-gray-800/70 border-2 border-green-400/30 cyber-tilt">
        <p className="text-sm font-display font-bold text-yellow-400 mb-2">CURRENT PRICE</p>
        <p className="text-4xl font-display font-black text-green-400 neon-glow">
          {selectedCrypto ? `$${selectedCrypto.price}` : '--'}
        </p>
        {/* <p className="text-xs text-slate-400">Live price from CoinGecko</p>  */}
      </div>

      {/* User Balances */}
      <div className="mb-6 flex justify-center space-x-6 bg-gray-900/80 border border-green-400/20 rounded-lg p-4">
        {cryptos.map(c => (
          <div key={c.symbol} className="text-center">
            <p className="text-xs text-yellow-400 font-bold">{c.symbol}</p>
            <p className="text-green-400 font-mono font-bold text-lg">{balances[c.symbol] ? Number(balances[c.symbol]).toFixed(4) : '--'}</p>
          </div>
        ))}
        <div className="text-center">
          <p className="text-xs text-yellow-400 font-bold">ETH</p>
          <p className="text-green-400 font-mono font-bold text-lg">{balances['ETH'] ? Number(balances['ETH']).toFixed(4) : '--'}</p>
        </div>
      </div>

      {/* Amount Input */}
      <div className="mb-6">
        <label className="block text-sm font-display font-bold text-yellow-400 mb-3">AMOUNT ({selectedToken})</label>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder={`ENTER AMOUNT OF ${selectedToken}...`}
          className="w-full p-4 bg-gray-800/70 border-2 border-green-400/30 rounded-lg text-green-400 placeholder-yellow-400/50 focus:border-yellow-400 focus:outline-none focus:shadow-chaos-green transition-all duration-300 font-display font-bold"
        />
      </div>

      {/* Trade Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleTrade}
          className={`brutal-button h-16 text-xl font-black ${action === 'buy' ? 'chaos-buy' : 'chaos-sell'}`}
          disabled={loading}
        >
          {action === 'buy' ? 'BUY' : 'SELL'}
        </Button>
      </div>
    </Card>
  );
};

export default TradingInterface;
