
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Zap, Flame, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const TradingInterface = () => {
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [priceGlitch, setPriceGlitch] = useState(false);
  const [tradingMood, setTradingMood] = useState('CHAOS');

  const cryptos = [
    { symbol: 'BTC', name: 'BITCOIN', price: 69420.69, change: +13.37, color: 'text-orange-400', glow: 'shadow-chaos-orange' },
    { symbol: 'ETH', name: 'ETHEREUM', price: 4200.42, change: -6.66, color: 'text-cyan-400', glow: 'shadow-brutal' },
    { symbol: 'DOGE', name: 'DOGECOIN', price: 0.420, change: +42.0, color: 'text-yellow-400', glow: 'shadow-chaos-yellow' },
    { symbol: 'SHIB', name: 'SHIBA', price: 0.00001337, change: +88.8, color: 'text-pink-400', glow: 'shadow-chaos-pink' }
  ];

  const selectedCoin = cryptos.find(c => c.symbol === selectedCrypto);

  useEffect(() => {
    const interval = setInterval(() => {
      setPriceGlitch(true);
      setTimeout(() => setPriceGlitch(false), 200);
      
      const moods = ['CHAOS', 'GREED', 'MOON', 'REKT', 'HODL'];
      setTradingMood(moods[Math.floor(Math.random() * moods.length)]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleTrade = (type: 'buy' | 'sell') => {
    const button = document.getElementById(`${type}-button`);
    if (button) {
      button.classList.add(type === 'buy' ? 'animate-profit-explosion' : 'animate-loss-shake');
      setTimeout(() => {
        button.classList.remove(type === 'buy' ? 'animate-profit-explosion' : 'animate-loss-shake');
      }, 600);
    }
  };

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
      
      {/* Crypto Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {cryptos.map((crypto) => (
          <button
            key={crypto.symbol}
            onClick={() => setSelectedCrypto(crypto.symbol)}
            className={`p-4 rounded-lg border-2 transition-all duration-300 cyber-tilt relative overflow-hidden ${
              selectedCrypto === crypto.symbol
                ? 'border-green-400 bg-green-400/10 shadow-chaos-green transform scale-105'
                : 'border-gray-600 bg-gray-800/50 hover:border-yellow-400 hover:shadow-brutal'
            }`}
          >
            {/* Bitcoin pattern for BTC */}
            {crypto.symbol === 'BTC' && (
              <div 
                className="absolute inset-0 opacity-5 bg-cover bg-center"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1500673922987-e212871fec22?w=200&h=150&fit=crop')"
                }}
              />
            )}
            <div className="relative z-10 text-left">
              <p className={`font-display font-black text-lg ${crypto.color} neon-glow`}>{crypto.symbol}</p>
              <p className="text-xs text-yellow-400 font-chaos">{crypto.name}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm font-display font-bold text-white">${crypto.price.toLocaleString()}</p>
                <span className={`text-xs flex items-center font-black ${
                  crypto.change > 0 ? 'text-green-400' : 'text-pink-400'
                }`}>
                  {crypto.change > 0 ? <Flame className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  {Math.abs(crypto.change)}%
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Price Display */}
      <div className={`text-center mb-6 p-6 rounded-lg bg-gray-800/70 border-2 border-green-400/30 cyber-tilt ${priceGlitch ? 'animate-glitch' : ''}`}>
        <p className="text-sm font-display font-bold text-yellow-400 mb-2">CURRENT PRICE</p>
        <p className="text-4xl font-display font-black text-green-400 neon-glow">
          ${selectedCoin?.price.toLocaleString()}
        </p>
        <p className={`text-lg flex items-center justify-center mt-2 font-display font-black ${
          selectedCoin && selectedCoin.change > 0 ? 'text-green-400' : 'text-pink-400'
        } neon-glow`}>
          {selectedCoin && selectedCoin.change > 0 ? 
            <Flame className="w-5 h-5 mr-2 animate-neon-pulse" /> : 
            <TrendingDown className="w-5 h-5 mr-2 animate-loss-shake" />
          }
          {selectedCoin && Math.abs(selectedCoin.change)}% (24H)
        </p>
      </div>

      {/* Amount Input */}
      <div className="mb-6">
        <label className="block text-sm font-display font-bold text-yellow-400 mb-3">AMOUNT (USD)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="ENTER AMOUNT..."
          className="w-full p-4 bg-gray-800/70 border-2 border-green-400/30 rounded-lg text-green-400 placeholder-yellow-400/50 focus:border-yellow-400 focus:outline-none focus:shadow-chaos-green transition-all duration-300 font-display font-bold"
        />
      </div>

      {/* Trading Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          id="buy-button"
          onClick={() => handleTrade('buy')}
          className="brutal-button chaos-buy h-16 text-xl font-black"
        >
          <TrendingUp className="w-6 h-6 mr-2" />
          BUY
        </Button>
        
        <Button
          id="sell-button"
          onClick={() => handleTrade('sell')}
          className="brutal-button chaos-sell h-16 text-xl font-black"
        >
          <TrendingDown className="w-6 h-6 mr-2" />
          SELL
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex justify-center space-x-2">
        {['25%', '50%', '75%', 'YOLO'].map((percent) => (
          <button
            key={percent}
            onClick={() => setAmount(percent === 'YOLO' ? '69420' : (parseInt(percent) * 100).toString())}
            className="px-4 py-2 text-xs font-display font-black bg-gray-800/70 hover:bg-green-500 hover:text-black text-yellow-400 rounded-lg border border-green-400/30 transition-all duration-200 cyber-tilt"
          >
            {percent}
          </button>
        ))}
      </div>
    </Card>
  );
};

export default TradingInterface;
