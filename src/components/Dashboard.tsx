
import React, { useState, useEffect } from 'react';
import { Trophy, Zap, TrendingUp, TrendingDown, Star, Award, Target, Flame } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import TradingInterface from './TradingInterface';
import Portfolio from './Portfolio';
import Leaderboard from './Leaderboard';
import AchievementModal from './AchievementModal';
import QuizModal from './QuizModal';

const Dashboard = () => {
  const [showAchievement, setShowAchievement] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [glitchText, setGlitchText] = useState(false);
  const [userStats] = useState({
    level: 42,
    xp: 6660,
    xpToNext: 7777,
    balance: 69420.69,
    totalProfit: 42069.42,
    winRate: 88.8,
    rank: 1,
    achievements: 13
  });

  const xpPercentage = (userStats.xp / userStats.xpToNext) * 100;

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 300);
    }, 3000);
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="min-h-screen bg-chaos-black p-4 space-y-6 relative overflow-hidden">
      {/* Matrix rain background */}
      <div className="matrix-rain" />
      
      {/* Hero Section with Background */}
      <div className="chaos-card relative z-10 hero-bg">
        <div className="absolute inset-0 bg-black/70 rounded-xl" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative cyber-tilt">
                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-green-500 to-yellow-500 p-1 shadow-brutal animate-brutal-bounce">
                  <div className="w-full h-full rounded-lg bg-black flex items-center justify-center relative overflow-hidden">
                    <span className={`text-2xl font-display font-black text-green-400 neon-glow ${glitchText ? 'animate-glitch' : ''}`}>
                      ΞX
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-30 -translate-x-full animate-[slide-in-right_2s_ease-in-out_infinite]" />
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-sm font-black text-black shadow-chaos-orange animate-chaos-spin">
                  {userStats.level}
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-display font-black text-green-400 glitch-text neon-glow" data-text="CRYPTOLORD">
                  CRYPTOLORD
                </h1>
                <p className="text-yellow-400 font-chaos text-sm">LVL {userStats.level} • CHAOS TIER</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-display font-black text-green-400 neon-glow">
                ${userStats.balance.toLocaleString()}
              </p>
              <p className="text-green-400 font-display font-bold">
                +${userStats.totalProfit.toLocaleString()} 🔥
              </p>
            </div>
          </div>

          {/* XP Bar with better contrast */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-display font-bold">
              <span className="text-yellow-400">XP TO NEXT CHAOS</span>
              <span className="text-green-400">{userStats.xp} / {userStats.xpToNext}</span>
            </div>
            <div className="relative">
              <div className="h-4 bg-gray-800 rounded-full border-2 border-green-400/30 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 via-yellow-400 to-green-500 rounded-full shadow-chaos-green animate-neon-pulse"
                  style={{ width: `${xpPercentage}%` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[slide-in-right_3s_ease-in-out_infinite]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats with illustrations */}
      <div className="grid grid-cols-2 gap-4 relative z-10">
        <Card className="chaos-card cyber-tilt hover:shadow-chaos-green transition-all duration-300 crypto-pattern">
          <div className="absolute inset-0 bg-black/60 rounded-xl" />
          <div className="relative z-10 flex items-center space-x-3">
            <div className="p-3 bg-green-500/20 rounded-lg border border-green-400/30">
              <Flame className="w-6 h-6 text-green-400 animate-neon-pulse" />
            </div>
            <div>
              <p className="text-sm font-display font-bold text-yellow-400">WIN STREAK</p>
              <p className="text-2xl font-display font-black text-green-400 neon-glow">{userStats.winRate}%</p>
            </div>
          </div>
        </Card>

        <Card className="chaos-card cyber-tilt hover:shadow-chaos-yellow transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-500/20 rounded-lg border border-orange-400/30">
              <Target className="w-6 h-6 text-orange-400 animate-chaos-spin" />
            </div>
            <div>
              <p className="text-sm font-display font-bold text-yellow-400">RANK</p>
              <p className="text-2xl font-display font-black text-orange-400 neon-glow">#{userStats.rank}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 relative z-10">
        <Button 
          onClick={() => setShowAchievement(true)}
          className="brutal-button chaos-buy h-16 text-lg"
        >
          <Award className="w-5 h-5 mr-2" />
          ACHIEVEMENTS
        </Button>
        <Button 
          onClick={() => setShowQuiz(true)}
          className="brutal-button chaos-sell h-16 text-lg"
        >
          <Zap className="w-5 h-5 mr-2" />
          CHAOS QUIZ
        </Button>
      </div>

      {/* Main Components */}
      <div className="relative z-10 space-y-6">
        <TradingInterface />
        <Portfolio />
        <Leaderboard />
      </div>

      {/* Modals */}
      <AchievementModal isOpen={showAchievement} onClose={() => setShowAchievement(false)} />
      <QuizModal isOpen={showQuiz} onClose={() => setShowQuiz(false)} />
    </div>
  );
};

export default Dashboard;
