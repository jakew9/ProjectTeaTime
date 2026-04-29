import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import teaData from '../data/teaData.json';

const questions = [
  {
    id: 1,
    question: "Which bakery treat calls your name?",
    options: [
      { text: "Flaky, buttery croissant", tags: ["Rich", "Umami"] },
      { text: "Dark chocolate rye bread", tags: ["Smoky", "Rich"] },
      { text: "Lemon-glazed shortbread", tags: ["Clean", "Astringent"] },
      { text: "Almond macaron", tags: ["Floral", "Delicate"] }
    ]
  },
  {
    id: 2,
    question: "What's your preferred evening drink?",
    options: [
      { text: "Peaty Islay Scotch", tags: ["Smoky", "Bold"] },
      { text: "Crisp Sauvignon Blanc", tags: ["Astringent", "Clean"] },
      { text: "Creamy Espresso Martini", tags: ["Rich", "Umami"] },
      { text: "Elderflower Gin & Tonic", tags: ["Floral", "Sweet"] }
    ]
  },
  {
    id: 3,
    question: "How do you like a meal to finish?",
    options: [
      { text: "A clean, refreshing snap", tags: ["Clean", "Astringent"] },
      { text: "A lingering, silky sweetness", tags: ["Sweet", "Delicate"] },
      { text: "A warm, roasted embrace", tags: ["Smoky", "Rich"] },
      { text: "A deep, savory depth", tags: ["Umami", "Rich"] }
    ]
  },
  {
    id: 4,
    question: "What's your ideal morning ritual?",
    options: [
      { text: "Strong, dark coffee and a newspaper", tags: ["Bold", "Smoky"] },
      { text: "A bowl of fresh berries and yogurt", tags: ["Sweet", "Clean"] },
      { text: "Miso soup and steamed rice", tags: ["Umami", "Rich"] },
      { text: "A quiet walk in a misty garden", tags: ["Delicate", "Floral"] }
    ]
  },
  {
    id: 5,
    question: "Which texture do you find most satisfying?",
    options: [
      { text: "Velvety and mouth-coating", tags: ["Rich", "Umami"] },
      { text: "Crisp and effervescent", tags: ["Clean", "Astringent"] },
      { text: "Light and airy", tags: ["Delicate", "Sweet"] },
      { text: "Robust and textured", tags: ["Bold", "Smoky"] }
    ]
  },
  {
    id: 6,
    question: "Close your eyes. What scent fills the air?",
    options: [
      { text: "A crackling wood fire", tags: ["Smoky", "Bold"] },
      { text: "Blooming jasmine on a breeze", tags: ["Floral", "Delicate"] },
      { text: "Damp earth after rain", tags: ["Umami", "Astringent"] },
      { text: "Caramelizing sugar", tags: ["Sweet", "Rich"] }
    ]
  }
];

export default function TeaQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState({});
  const [result, setResult] = useState(null);

  const handleAnswer = (tags) => {
    const newScores = { ...scores };
    tags.forEach(tag => {
      newScores[tag] = (newScores[tag] || 0) + 1;
    });
    setScores(newScores);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult(newScores);
    }
  };

  const calculateResult = (finalScores) => {
    let bestMatch = null;
    let highestScore = -1;

    teaData.forEach(tea => {
      let currentTeaScore = 0;
      tea.tags.forEach(tag => {
        if (finalScores[tag]) {
          currentTeaScore += finalScores[tag];
        }
      });

      if (currentTeaScore > highestScore) {
        highestScore = currentTeaScore;
        bestMatch = tea;
      }
    });

    setResult(bestMatch);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setScores({});
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 min-h-[400px] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-2">
              <span className="text-xs uppercase tracking-widest text-cream/40">
                Question {currentStep + 1} of {questions.length}
              </span>
              <h2 className="text-3xl font-serif text-cream">{questions[currentStep].question}</h2>
            </div>

            <div className="grid gap-4">
              {questions[currentStep].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option.tags)}
                  className="w-full text-left p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                  <span className="text-lg font-body text-cream/80 group-hover:text-cream">
                    {option.text}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-cream/40">Your Soul Match</span>
              <h2 className="text-5xl font-serif text-cream">{result.name}</h2>
              <p className="text-cream/60 italic text-lg">{result.description}</p>
            </div>

            <div className="bg-white/5 rounded-2xl p-8 border border-white/10 space-y-4">
              <h3 className="text-sm uppercase tracking-widest text-cream/40">Foodie Pairing</h3>
              <p className="text-cream/80 leading-relaxed">
                {result.foodiePairing}
              </p>
            </div>

            <button
              onClick={resetQuiz}
              className="px-8 py-3 rounded-full border border-cream/20 text-cream/60 hover:text-cream hover:border-cream/50 transition-all duration-300"
            >
              Start Over
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
