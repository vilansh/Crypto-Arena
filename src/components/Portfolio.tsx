
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Eye, Flame, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Portfolio = () => {
  const [portfolioMood, setPortfolioMood] = useState('PUMPING');
  
  const holdings = [
    { symbol: 'BTC', amount: 1.337, value: 92854.20, change: +42.69, color: 'from-chaos-orange to-chaos-yellow', glowColor: 'shadow-chaos-orange' },
    { symbol: 'ETH', amount: 13.37, value: 56133.69, change: -13.37, color: 'from-chaos-cyan to-chaos-green', glowColor: 'shadow-brutal' },
    { symbol: 'DOGE', amount: 69420, value: 29157.24, change: +88.88, color: 'from-chaos-yellow to-chaos-orange', glowColor: 'shadow-chaos-yellow' },
    { symbol: 'SHIB', amount: 1337000, value: 17867.89, change: +666.66, color: 'from-chaos-pink to-chaos-purple', glowColor: 'shadow-chaos-pink' }
  ];

  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);
  const totalChange = holdings.reduce((sum, holding) => sum + (holding.value * holding.change / 100), 0);
  const totalChangePercent = (totalChange / totalValue) * 100;

  useEffect(() => {
    const interval = setInterval(() => {
      const moods = ['PUMPING', 'DUMPING', 'SIDEWAYS', 'MOON', 'REKT'];
      setPortfolioMood(moods[Math.floor(Math.random() * moods.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
        <div className={`flex items-center justify-center text-xl font-display font-black ${
          totalChangePercent > 0 ? 'text-chaos-green' : 'text-chaos-pink'
        } neon-glow`}>
          {totalChangePercent > 0 ? 
            <Flame className="w-6 h-6 mr-2 animate-neon-pulse" /> : 
            <TrendingDown className="w-6 h-6 mr-2 animate-loss-shake" />
          }
          {totalChangePercent > 0 ? '+' : ''}${totalChange.toLocaleString()} ({totalChangePercent.toFixed(2)}%)
        </div>
      </div>

      {/* Chaos Holdings */}
      <div className="space-y-4">
        {holdings.map((holding, index) => {
          const percentage = (holding.value / totalValue) * 100;
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
                    <p className={`text-sm flex items-center justify-end font-display font-bold ${
                      holding.change > 0 ? 'text-green-200' : 'text-red-200'
                    }`}>
                      {holding.change > 0 ? 
                        <Flame className="w-4 h-4 mr-1 animate-neon-pulse" /> : 
                        <TrendingDown className="w-4 h-4 mr-1 animate-loss-shake" />
                      }
                      {holding.change > 0 ? '+' : ''}{holding.change}%
                    </p>
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

      {/* Chaos Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-greed-darker border border-chaos-green text-center cyber-tilt">
          <p className="text-xs font-display font-bold text-chaos-yellow">TOP GAINER</p>
          <p className="text-lg font-display font-black text-chaos-green neon-glow">SHIB +666%</p>
        </div>
        <div className="p-4 rounded-lg bg-greed-darker border border-chaos-pink text-center cyber-tilt">
          <p className="text-xs font-display font-bold text-chaos-yellow">CHAOS LEVEL</p>
          <p className="text-lg font-display font-black text-chaos-pink neon-glow">MAXIMUM</p>
        </div>
      </div>
    </Card>
  );
};

export default Portfolio;
