import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Zap, Flame, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useWallet } from '../hooks/useWallet';
import { ethers } from 'ethers';
import { fetchBalances } from '../utils/fetchBalances';
import { CONTRACTS } from '../constants';
import { getERC20Contract, getExchangeContract } from '../lib/contract';
import { BrowserProvider } from "ethers";

const TradingInterface = () => {
  const { address, connectWallet } = useWallet();
  const [fromToken, setFromToken] = useState('BTC');
  const [toToken, setToToken] = useState('ETH');
  const [amount, setAmount] = useState('');
  const [balances, setBalances] = useState<{ [symbol: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [priceGlitch, setPriceGlitch] = useState(false);
  const [tradingMood, setTradingMood] = useState('CHAOS');

  const cryptos = [
    { symbol: 'BTC', name: 'BITCOIN', price: 69420.69, change: +13.37, color: 'text-orange-400', glow: 'shadow-chaos-orange' },
    { symbol: 'ETH', name: 'ETHEREUM', price: 4200.42, change: -6.66, color: 'text-cyan-400', glow: 'shadow-brutal' },
    { symbol: 'DOGE', name: 'DOGECOIN', price: 0.420, change: +42.0, color: 'text-yellow-400', glow: 'shadow-chaos-yellow' },
    { symbol: 'SHIB', name: 'SHIBA', price: 0.00001337, change: +88.8, color: 'text-pink-400', glow: 'shadow-chaos-pink' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPriceGlitch(true);
      setTimeout(() => setPriceGlitch(false), 200);
      const moods = ['CHAOS', 'GREED', 'MOON', 'REKT', 'HODL'];
      setTradingMood(moods[Math.floor(Math.random() * moods.length)]);
    }, 2000);
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

  const handleSwap = async () => {
    if (!address) {
      connectWallet();
      return;
    }
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert('Enter a valid amount.');
      return;
    }
    if (fromToken === toToken) {
      alert('Select different tokens to swap.');
      return;
    }
    setLoading(true);
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tokenContract = getERC20Contract(CONTRACTS.tokens[fromToken], signer);
      const exchangeContract = getExchangeContract(signer);
      provider.getNetwork().then(network => {
        console.log("Current network:", network);
      });
      console.log("Token address:", CONTRACTS.tokens[fromToken]);
      const allowance = await tokenContract.allowance(address, CONTRACTS.exchange);
      if (allowance < ethers.parseUnits(amount, 18)) {
        const approveTx = await tokenContract.approve(CONTRACTS.exchange, ethers.parseUnits(amount, 18));
        await approveTx.wait();
      }
      console.log("Calling swap with:", fromToken, toToken, ethers.parseUnits(amount, 18).toString());
      const swapTx = await exchangeContract.swap("BTC", "ETH", ethers.parseUnits(amount, 18));
      await swapTx.wait();
      alert(`✅ Swapped ${amount} ${fromToken} to ${toToken}!`);
      await refreshBalances();
    } catch (err) {
      console.error("Swap error:", err);
      alert('❌ Swap failed.');
    }
    setLoading(false);
  };

  const selectedFrom = cryptos.find(c => c.symbol === fromToken);
  const selectedTo = cryptos.find(c => c.symbol === toToken);

  return (
    <Card className="chaos-card relative overflow-hidden">
      {/* Trading mood indicator with whale background */}
      <div className="absolute top-0 right-0 p-2">
        <span className="text-xs font-display font-black text-yellow-400 glitch-text neon-glow animate-neon-pulse">
          {tradingMood}
        </span>
      </div>
      
      {/* Whale illustration in background */}
      <div 
        className="absolute top-4 right-4 w-16 h-12 opacity-10 bg-contain bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=100&h=80&fit=crop')"
        }}
      />
      
      <h3 className="text-2xl font-display font-black text-green-400 glitch-text mb-6 neon-glow" data-text="TRADE OR DIE">
        TRADE OR DIE
      </h3>
      
      {/* Token Pair Selection */}
      <div className="flex justify-center items-center mb-6 space-x-4">
        <div>
          <label className="block text-xs text-yellow-400 font-bold mb-1">From</label>
          <select
            value={fromToken}
            onChange={e => setFromToken(e.target.value)}
            className="p-2 rounded bg-gray-800 text-green-400 font-bold border border-green-400/30"
          >
            {cryptos.map(c => (
              <option key={c.symbol} value={c.symbol}>{c.symbol}</option>
            ))}
          </select>
        </div>
        <span className="text-yellow-400 font-bold">→</span>
        <div>
          <label className="block text-xs text-yellow-400 font-bold mb-1">To</label>
          <select
            value={toToken}
            onChange={e => setToToken(e.target.value)}
            className="p-2 rounded bg-gray-800 text-green-400 font-bold border border-green-400/30"
          >
            {cryptos.filter(c => c.symbol !== fromToken).map(c => (
              <option key={c.symbol} value={c.symbol}>{c.symbol}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Price Display */}
      <div className={`text-center mb-6 p-6 rounded-lg bg-gray-800/70 border-2 border-green-400/30 cyber-tilt ${priceGlitch ? 'animate-glitch' : ''}`}>
        <p className="text-sm font-display font-bold text-yellow-400 mb-2">CURRENT PRICE</p>
        <p className="text-4xl font-display font-black text-green-400 neon-glow">
          {selectedFrom && selectedTo ? `${selectedFrom.symbol}/${selectedTo.symbol}` : '--'}
        </p>
        <p className="text-lg flex items-center justify-center mt-2 font-display font-black text-green-400 neon-glow">
          {/* You can add price logic here if you want */}
          Swap instantly on Sepolia testnet
        </p>
      </div>

      {/* User Balances */}
      <div className="mb-6 flex justify-center space-x-6 bg-gray-900/80 border border-green-400/20 rounded-lg p-4">
        {cryptos.map(c => (
          <div key={c.symbol} className="text-center">
            <p className="text-xs text-yellow-400 font-bold">{c.symbol}</p>
            <p className="text-green-400 font-mono font-bold text-lg">{balances[c.symbol] ? Number(balances[c.symbol]).toFixed(4) : '--'}</p>
          </div>
        ))}
      </div>

      {/* Amount Input */}
      <div className="mb-6">
        <label className="block text-sm font-display font-bold text-yellow-400 mb-3">AMOUNT ({fromToken})</label>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder={`ENTER AMOUNT OF ${fromToken}...`}
          className="w-full p-4 bg-gray-800/70 border-2 border-green-400/30 rounded-lg text-green-400 placeholder-yellow-400/50 focus:border-yellow-400 focus:outline-none focus:shadow-chaos-green transition-all duration-300 font-display font-bold"
        />
      </div>

      {/* Swap Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleSwap}
          className="brutal-button chaos-buy h-16 text-xl font-black"
          disabled={loading}
        >
          SWAP
        </Button>
      </div>
    </Card>
  );
};

export default TradingInterface;
