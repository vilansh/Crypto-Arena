
import React from 'react';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Leaderboard = () => {
  const topTraders = [
    { rank: 1, name: 'Vilansh', profit: 125648, winRate: 89.5, avatar: 'CK', color: 'from-yellow-400 to-orange-500', trophyColor: 'text-yellow-400' },
    { rank: 2, name: '0xcrypto', profit: 98432, winRate: 85.2, avatar: 'ML', color: 'from-gray-300 to-gray-500', trophyColor: 'text-gray-300' },
    { rank: 3, name: 'Eth.vilansh', profit: 87234, winRate: 82.7, avatar: 'DH', color: 'from-amber-600 to-orange-700', trophyColor: 'text-amber-600' },
    { rank: 4, name: 'CryptoTrader', profit: 76543, winRate: 78.5, avatar: 'CX', color: 'from-blue-400 to-purple-500', trophyColor: 'text-blue-400', isCurrentUser: true },
    { rank: 5, name: 'HODLMaster', profit: 65421, winRate: 75.3, avatar: 'HM', color: 'from-green-400 to-teal-500', trophyColor: 'text-green-400' }
  ];

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
            key={trader.rank}
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
                {getTrophyIcon(trader.rank)}
              </div>

              {/* Avatar */}
              <div className="relative">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${trader.color} p-1`}>
                  <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{trader.avatar}</span>
                  </div>
                </div>
                {trader.rank <= 3 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-xs">⭐</span>
                  </div>
                )}
              </div>

              {/* Trader Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className={`font-semibold ${trader.isCurrentUser ? 'text-neon-blue' : 'text-white'}`}>
                    {trader.name}
                    {trader.isCurrentUser && <span className="ml-2 text-xs text-neon-blue">(You)</span>}
                  </h4>
                  <div className="text-right">
                    <p className="text-lg font-bold text-neon-green">+${trader.profit.toLocaleString()}</p>
                    <p className="text-xs text-slate-400">{trader.winRate}% Win Rate</p>
                  </div>
                </div>

                {/* Progress Bar for Win Rate */}
                <div className="mt-2 w-full bg-slate-700 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full bg-gradient-to-r ${trader.color} transition-all duration-1000 ease-out`}
                    style={{ 
                      width: `${trader.winRate}%`,
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
