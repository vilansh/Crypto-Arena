import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Eye, Flame } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useWallet } from '../hooks/useWallet';
import { fetchUserTrades } from '../utils/api';
import { fetchLivePrices } from '../utils/fetchPrices';

const Portfolio = () => {
  const [portfolioMood, setPortfolioMood] = useState('PUMPING');
  const { address } = useWallet();
  const [trades, setTrades] = useState<any[]>([]);
  const [prices, setPrices] = useState<any>({});
  const [holdings, setHoldings] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const moods = ['PUMPING', 'DUMPING', 'SIDEWAYS', 'MOON', 'REKT'];
      setPortfolioMood(moods[Math.floor(Math.random() * moods.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (address) {
      fetchUserTrades(address).then(setTrades);
    }
    fetchLivePrices().then(setPrices);
    const interval = setInterval(() => {
      fetchLivePrices().then(setPrices);
    }, 10000);
    return () => clearInterval(interval);
  }, [address]);

  useEffect(() => {
    // Calculate holdings from trades
    const tokens = ['BTC', 'ETH', 'DOGE', 'SHIB'];
    const holdingsMap: Record<string, number> = {};
    tokens.forEach(t => holdingsMap[t] = 0);
    trades.forEach(trade => {
      if (trade.side === 'buy') {
        holdingsMap[trade.token] += Number(trade.amount);
      } else if (trade.side === 'sell') {
        holdingsMap[trade.token] -= Number(trade.amount);
      }
    });
    const newHoldings = tokens.map(symbol => {
      let price = 0;
      if (symbol === 'SHIB') price = prices['shiba-inu']?.usd ?? 0;
      else if (symbol === 'BTC') price = prices.bitcoin?.usd ?? 0;
      else if (symbol === 'ETH') price = prices.ethereum?.usd ?? 0;
      else if (symbol === 'DOGE') price = prices.dogecoin?.usd ?? 0;
      return {
        symbol,
        amount: holdingsMap[symbol],
        value: holdingsMap[symbol] * price,
        color: symbol === 'BTC' ? 'from-chaos-orange to-chaos-yellow' : symbol === 'ETH' ? 'from-chaos-cyan to-chaos-green' : symbol === 'DOGE' ? 'from-chaos-yellow to-chaos-orange' : 'from-chaos-pink to-chaos-purple',
        glowColor: symbol === 'BTC' ? 'shadow-chaos-orange' : symbol === 'ETH' ? 'shadow-brutal' : symbol === 'DOGE' ? 'shadow-chaos-yellow' : 'shadow-chaos-pink',
      };
    });
    setHoldings(newHoldings);
  }, [trades, prices]);

  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);

  return (
    <Card className="chaos-card relative overflow-hidden">
      <div className="absolute top-0 right-0 p-2">
        <span className="text-xs font-display font-black text-chaos-pink glitch-text neon-glow animate-neon-pulse">
          {portfolioMood}
        </span>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-display font-black text-chaos-green glitch-text neon-glow" data-text="PORTFOLIO">
          PORTFOLIO
        </h3>
        <Eye className="w-6 h-6 text-chaos-yellow animate-brutal-bounce" />
      </div>

      {/* Total Chaos Display */}
      <div className="text-center mb-8 p-6 rounded-lg bg-greed-darker border-2 border-chaos-pink cyber-tilt relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-chaos-pink/10 to-transparent -translate-x-full animate-[slide-in-right_4s_ease-in-out_infinite]" />
        <p className="text-sm font-display font-bold text-chaos-yellow mb-2">TOTAL CHAOS VALUE</p>
        <p className="text-5xl font-display font-black text-chaos-green neon-glow mb-3">
          ${totalValue.toLocaleString()}
        </p>
      </div>

      {/* Chaos Holdings */}
      <div className="space-y-4">
        {holdings.map((holding, index) => {
          const percentage = totalValue > 0 ? (holding.value / totalValue) * 100 : 0;
          return (
            <div
              key={holding.symbol}
              className={`relative group cursor-pointer transform hover:scale-105 transition-all duration-300 cyber-tilt ${holding.glowColor}`}
              style={{
                transform: `perspective(1000px) rotateX(${index * 3}deg) rotateY(${index * 2}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <div className={`p-5 rounded-lg bg-gradient-to-r ${holding.color} border-2 border-white/20 shadow-brutal group-hover:shadow-chaos-green transition-all duration-300 relative overflow-hidden`}>
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                
                <div className="relative z-10 flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-chaos-black/50 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      <span className="font-display font-black text-white text-lg">{holding.symbol}</span>
                    </div>
                    <div>
                      <p className="font-display font-black text-white text-lg">{holding.symbol}</p>
                      <p className="text-sm text-white/80 font-chaos">{holding.amount} COINS</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-display font-black text-white">${holding.value.toLocaleString()}</p>
                  </div>
                </div>
                
                {/* Chaos Progress Bar */}
                <div className="relative h-3 bg-chaos-black/30 rounded-full overflow-hidden border border-white/20">
                  <div 
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-white/60 to-white/80 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[slide-in-right_3s_ease-in-out_infinite]" />
                </div>
                <p className="text-xs text-white/80 mt-2 text-right font-display font-bold">{percentage.toFixed(1)}% CHAOS</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default Portfolio;
