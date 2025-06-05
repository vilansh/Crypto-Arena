
import React, { useState } from 'react';
import { Brain, Check, X, Zap, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const questions = [
    {
      question: "What does 'HODL' mean in crypto trading?",
      options: [
        "Hold On for Dear Life",
        "High Order Digital Ledger", 
        "Holding Original Digital Lot",
        "Happy Online Day Learning"
      ],
      correct: 0,
      explanation: "HODL is a misspelling of 'hold' that became a popular strategy meaning to hold cryptocurrency long-term."
    },
    {
      question: "What is a 'bull market'?",
      options: [
        "A market with aggressive traders",
        "A market with rising prices",
        "A market with falling prices",
        "A market with stable prices"
      ],
      correct: 1,
      explanation: "A bull market refers to a period of rising prices and optimistic market sentiment."
    },
    {
      question: "What does DCA stand for?",
      options: [
        "Digital Currency Analysis",
        "Daily Crypto Advice",
        "Dollar Cost Averaging",
        "Decentralized Currency Algorithm"
      ],
      correct: 2,
      explanation: "DCA is an investment strategy where you invest a fixed amount regularly, regardless of price."
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    if (answered) return;
    
    setSelectedAnswer(answerIndex);
    setAnswered(true);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <Card className="glass-card p-6 rounded-2xl max-w-md w-full animate-slide-up">
        {!showResult ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink p-2 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-white">Crypto Quiz</h2>
                  <p className="text-sm text-slate-400">Question {currentQuestion + 1} of {questions.length}</p>
                </div>
              </div>
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                {questions[currentQuestion].question}
              </h3>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={answered}
                    className={`w-full p-4 text-left rounded-xl border transition-all duration-300 ${
                      answered
                        ? index === questions[currentQuestion].correct
                          ? 'border-neon-green bg-neon-green/10 text-neon-green'
                          : index === selectedAnswer
                          ? 'border-neon-red bg-neon-red/10 text-neon-red'
                          : 'border-slate-600 bg-slate-800/50 text-slate-400'
                        : 'border-slate-600 bg-slate-800/50 text-white hover:border-neon-purple hover:bg-neon-purple/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {answered && (
                        <div className="flex-shrink-0 ml-2">
                          {index === questions[currentQuestion].correct ? (
                            <Check className="w-5 h-5 text-neon-green" />
                          ) : index === selectedAnswer ? (
                            <X className="w-5 h-5 text-neon-red" />
                          ) : null}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Explanation */}
            {answered && (
              <div className="mb-6 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                <p className="text-sm text-slate-300">
                  <span className="font-semibold text-neon-blue">Explanation: </span>
                  {questions[currentQuestion].explanation}
                </p>
              </div>
            )}

            {/* Next Button */}
            {answered && (
              <Button
                onClick={nextQuestion}
                className="w-full gaming-button h-12"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Show Results'}
                <Zap className="w-4 h-4 ml-2" />
              </Button>
            )}
          </>
        ) : (
          /* Results */
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink p-1">
              <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                <Star className="w-8 h-8 text-neon-gold animate-float" />
              </div>
            </div>

            <h2 className="text-2xl font-display font-bold text-white mb-2">Quiz Complete!</h2>
            <p className="text-lg text-slate-300 mb-6">
              You scored <span className="text-neon-gold font-bold">{score}/{questions.length}</span>
            </p>

            {/* Performance Message */}
            <div className="mb-6 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
              <p className="text-sm text-slate-300">
                {score === questions.length ? "🔥 Perfect! You're a crypto expert!" :
                 score >= questions.length * 0.7 ? "🎉 Great job! You know your crypto!" :
                 score >= questions.length * 0.5 ? "📚 Not bad! Keep learning!" :
                 "🤔 Time to study up on crypto basics!"}
              </p>
            </div>

            {/* Reward */}
            <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-neon-gold/10 to-yellow-500/10 border border-neon-gold/30">
              <p className="text-sm text-slate-300 mb-1">Reward Earned</p>
              <p className="text-lg font-bold text-neon-gold">+{score * 50} XP</p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                onClick={resetQuiz}
                className="w-full gaming-button h-12"
              >
                Try Again
              </Button>
              <Button
                onClick={onClose}
                variant="outline"
                className="w-full h-12 border-slate-600 text-slate-300 hover:bg-slate-800"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default QuizModal;
