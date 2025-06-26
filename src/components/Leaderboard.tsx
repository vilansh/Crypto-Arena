import React, { useEffect, useState } from 'react';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { fetchLeaderboard } from '../utils/api';

const Leaderboard = () => {
  const [topTraders, setTopTraders] = useState<any[]>([]);

  useEffect(() => {
    fetchLeaderboard().then(setTopTraders);
  }, []);

  const getTrophyIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-400 animate-float" />;
      case 2: return <Medal className="w-6 h-6 text-gray-300" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <span className="text-lg font-bold text-slate-400">#{rank}</span>;
    }
  };

  return (
    <Card className="glass-card p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-display font-bold text-white">Leaderboard</h3>
        <TrendingUp className="w-5 h-5 text-neon-gold animate-pulse" />
      </div>

      <div className="space-y-3">
        {topTraders.map((trader, index) => (
          <div
            key={trader.rank || trader.wallet || index}
            className={`relative overflow-hidden p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${
              trader.isCurrentUser 
                ? 'border-neon-blue bg-neon-blue/10 shadow-neon-blue animate-pulse-neon' 
                : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
            }`}
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            {/* Rank and Trophy */}
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                {getTrophyIcon(index + 1)}
              </div>

              {/* Avatar */}
              <div className="relative">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${trader.color || 'from-yellow-400 to-orange-500'} p-1`}>
                  <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{trader.avatar || (trader.wallet ? trader.wallet.slice(2, 4).toUpperCase() : '??')}</span>
                  </div>
                </div>
                {index < 3 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-xs">⭐</span>
                  </div>
                )}
              </div>

              {/* Trader Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className={`font-semibold ${trader.isCurrentUser ? 'text-neon-blue' : 'text-white'}`}>{trader.name || trader.wallet || 'Trader'}</h4>
                  <div className="text-right">
                    <p className="text-lg font-bold text-neon-green">${trader.profit?.toLocaleString() || trader.value?.toLocaleString() || '--'}</p>
                    <p className="text-xs text-slate-400">{trader.winRate ? `${trader.winRate}% Win Rate` : ''}</p>
                  </div>
                </div>
                {/* Progress Bar for Win Rate */}
                <div className="mt-2 w-full bg-slate-700 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full bg-gradient-to-r ${trader.color || 'from-yellow-400 to-orange-500'} transition-all duration-1000 ease-out`}
                    style={{ 
                      width: `${trader.winRate || 100}%`,
                      animationDelay: `${index * 200}ms`
                    }}
                  />
                </div>
              </div>
            </div>
            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 -translate-x-full hover:translate-x-full transform transition-transform duration-700" />
          </div>
        ))}
      </div>

      {/* Your Rank Summary */}
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 border border-neon-blue/30">
        <div className="text-center">
          <p className="text-sm text-slate-400 mb-1">Your Current Rank</p>
          <p className="text-2xl font-bold text-neon-blue">#4</p>
          <p className="text-xs text-slate-400 mt-1">🔥 2 positions up from yesterday!</p>
        </div>
      </div>
    </Card>
  );
};

export default Leaderboard;
