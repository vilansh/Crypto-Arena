
import React, { useEffect, useState } from 'react';
import { Trophy, Star, Award, X, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AchievementModal: React.FC<AchievementModalProps> = ({ isOpen, onClose }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  const achievements = [
    { 
      id: 1, 
      title: 'First Trade', 
      description: 'Complete your first trade', 
      icon: Zap, 
      completed: true, 
      rarity: 'Common',
      color: 'from-blue-400 to-blue-600',
      reward: '50 XP'
    },
    { 
      id: 2, 
      title: 'Profit Master', 
      description: 'Make $1,000 profit in a day', 
      icon: Trophy, 
      completed: true, 
      rarity: 'Rare',
      color: 'from-yellow-400 to-orange-500',
      reward: '200 XP'
    },
    { 
      id: 3, 
      title: 'Diamond Hands', 
      description: 'Hold a position for 30 days', 
      icon: Award, 
      completed: false, 
      rarity: 'Epic',
      color: 'from-purple-400 to-pink-500',
      reward: '500 XP'
    },
    { 
      id: 4, 
      title: 'Speed Trader', 
      description: 'Complete 100 trades in an hour', 
      icon: Star, 
      completed: true, 
      rarity: 'Legendary',
      color: 'from-red-400 to-pink-500',
      reward: '1000 XP'
    }
  ];

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#00D4FF', '#8B5CF6', '#EC4899', '#F59E0B'][Math.floor(Math.random() * 4)],
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      <Card className="glass-card p-6 rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-gradient">Achievements</h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`relative overflow-hidden p-4 rounded-xl border transition-all duration-300 ${
                achievement.completed
                  ? 'border-neon-gold bg-gradient-to-r from-yellow-400/10 to-orange-500/10 shadow-neon-gold/30'
                  : 'border-slate-600 bg-slate-800/50'
              }`}
            >
              {/* Shine Effect for Completed Achievements */}
              {achievement.completed && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[slide-in-right_2s_ease-in-out_infinite]" />
              )}

              <div className="flex items-center space-x-4">
                {/* Achievement Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${achievement.color} p-2 flex items-center justify-center ${
                  achievement.completed ? 'animate-float' : 'opacity-50'
                }`}>
                  <achievement.icon className="w-6 h-6 text-white" />
                </div>

                {/* Achievement Info */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-semibold ${achievement.completed ? 'text-white' : 'text-slate-400'}`}>
                      {achievement.title}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      achievement.rarity === 'Common' ? 'bg-blue-500/20 text-blue-400' :
                      achievement.rarity === 'Rare' ? 'bg-yellow-500/20 text-yellow-400' :
                      achievement.rarity === 'Epic' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {achievement.rarity}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mb-2">{achievement.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neon-blue font-semibold">+{achievement.reward}</span>
                    {achievement.completed && (
                      <span className="text-xs text-neon-green flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        Completed
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress Bar for Incomplete Achievements */}
              {!achievement.completed && (
                <div className="mt-3 w-full bg-slate-700 rounded-full h-1">
                  <div 
                    className="h-1 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple"
                    style={{ width: `${Math.random() * 60 + 20}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-700/50">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-slate-400">Completed</p>
              <p className="text-lg font-bold text-neon-green">3/4</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Total XP</p>
              <p className="text-lg font-bold text-neon-blue">1,750</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Rarest</p>
              <p className="text-lg font-bold text-red-400">Legendary</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AchievementModal;
