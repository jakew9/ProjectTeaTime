import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import teaData from '../data/teaData.json';

const questions = [
  {
    id: 1,
    question: "Which bakery treat calls your name?",
    options: [
      { text: "Flaky, buttery croissant", tags: ["Rich", "Sweet"] },
      { text: "Dark chocolate rye bread", tags: ["Smoky", "Bold", "Rich"] },
      { text: "Lemon-glazed shortbread", tags: ["Clean", "Light", "Astringent"] },
      { text: "Almond macaron", tags: ["Floral", "Delicate", "Sweet"] },
      { text: "Savory scallion pancake", tags: ["Umami", "Savory", "Fresh"] }
    ]
  },
  {
    id: 2,
    question: "What's your preferred evening entree?",
    options: [
      { text: "Smoked brisket with BBQ sauce", tags: ["Smoky", "Bold", "Rich"] },
      { text: "Fresh Sashimi platter", tags: ["Clean", "Fresh", "Umami"] },
      { text: "Creamy mushroom risotto", tags: ["Rich", "Umami", "Savory"] },
      { text: "Spicy Thai green curry", tags: ["Spicy", "Bold", "Fresh"] },
      { text: "Roasted root vegetables", tags: ["Earthy", "Roasted", "Sweet"] }
    ]
  },
  {
    id: 3,
    question: "How do you like a meal to finish?",
    options: [
      { text: "A clean, refreshing snap", tags: ["Clean", "Astringent"] },
      { text: "A lingering, silky sweetness", tags: ["Sweet", "Delicate", "Light"] },
      { text: "A warm, roasted embrace", tags: ["Roasted", "Smoky", "Rich"] },
      { text: "A deep, savory depth", tags: ["Umami", "Savory", "Bold"] },
      { text: "A bright, citrusy zing", tags: ["Fresh", "Astringent", "Clean"] }
    ]
  },
  {
    id: 4,
    question: "What's your ideal morning ritual?",
    options: [
      { text: "Strong, dark coffee and a newspaper", tags: ["Bold", "Smoky", "Rich"] },
      { text: "A bowl of fresh berries and yogurt", tags: ["Sweet", "Clean", "Light"] },
      { text: "Miso soup and steamed rice", tags: ["Umami", "Savory", "Rich"] },
      { text: "A quiet walk in a misty garden", tags: ["Delicate", "Floral", "Fresh"] },
      { text: "Hot water with lemon and honey", tags: ["Clean", "Fresh", "Sweet"] }
    ]
  },
  {
    id: 5,
    question: "Which texture do you find most satisfying?",
    options: [
      { text: "Velvety and mouth-coating", tags: ["Rich", "Creamy", "Umami"] },
      { text: "Crisp and effervescent", tags: ["Clean", "Astringent", "Fresh"] },
      { text: "Light and airy", tags: ["Delicate", "Light", "Floral"] },
      { text: "Robust and textured", tags: ["Bold", "Earthy", "Roasted"] },
      { text: "Cooling and smooth", tags: ["Cooling", "Sweet", "Fresh"] }
    ]
  },
  {
    id: 6,
    question: "Close your eyes. What scent fills the air?",
    options: [
      { text: "A crackling wood fire", tags: ["Smoky", "Bold", "Roasted"] },
      { text: "Blooming jasmine on a breeze", tags: ["Floral", "Delicate", "Fresh"] },
      { text: "Damp earth after rain", tags: ["Earthy", "Umami", "Astringent"] },
      { text: "Caramelizing sugar", tags: ["Sweet", "Rich", "Malty"] },
      { text: "Freshly cut grass", tags: ["Grassy", "Fresh", "Clean"] }
    ]
  },
  {
    id: 7,
    question: "What's your favorite weather for a walk?",
    options: [
      { text: "Hot and tropical", tags: ["Fruity", "Fresh", "Sweet"] },
      { text: "Crisp, cold winter air", tags: ["Cooling", "Clean", "Astringent"] },
      { text: "Misty and mysterious", tags: ["Earthy", "Umami", "Delicate"] },
      { text: "Golden afternoon sun", tags: ["Floral", "Honey", "Light"] },
      { text: "A stormy, dark sky", tags: ["Smoky", "Bold", "Rich"] }
    ]
  },
  {
    id: 8,
    question: "Pick a vacation destination:",
    options: [
      { text: "A bustling spice market", tags: ["Spicy", "Bold", "Rich"] },
      { text: "A serene alpine meadow", tags: ["Floral", "Delicate", "Light"] },
      { text: "A rugged coastal cliff", tags: ["Mineral", "Astringent", "Clean"] },
      { text: "A cozy mountain cabin", tags: ["Smoky", "Roasted", "Rich"] },
      { text: "A lush, green rainforest", tags: ["Grassy", "Fresh", "Umami"] }
    ]
  },
  {
    id: 9,
    question: "Which fruit do you crave most?",
    options: [
      { text: "Dark, ripe cherries", tags: ["Rich", "Sweet", "Fruity"] },
      { text: "Tart green apples", tags: ["Astringent", "Clean", "Fresh"] },
      { text: "Creamy white peaches", tags: ["Floral", "Sweet", "Delicate"] },
      { text: "Exotic lychee or mango", tags: ["Fruity", "Honey", "Fresh"] },
      { text: "Sun-dried figs", tags: ["Earthy", "Rich", "Sweet"] }
    ]
  },
  {
    id: 10,
    question: "What's your preferred level of intensity?",
    options: [
      { text: "Soft and whisper-light", tags: ["Delicate", "Light", "Floral"] },
      { text: "Bright and energetic", tags: ["Fresh", "Clean", "Astringent"] },
      { text: "Balanced and harmonious", tags: ["Sweet", "Umami", "Honey"] },
      { text: "Strong and assertive", tags: ["Bold", "Smoky", "Roasted"] },
      { text: "Deep and meditative", tags: ["Earthy", "Rich", "Savory"] }
    ]
  }
];

export default function TeaQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [history, setHistory] = useState([teaData]);
  const [result, setResult] = useState(null);

  // currentPool is the last item in history
  const currentPool = history[history.length - 1];

  const handleAnswer = (selectedTags) => {
    // Elimination Logic: Keep teas that have AT LEAST ONE of the selected tags
    // Or, more strictly: Keep teas where tags overlap.
    // Let's go with: Keep if tea.tags share any element with selectedTags
    const nextPool = currentPool.filter(tea => 
      tea.tags.some(tag => selectedTags.includes(tag))
    );

    // If nextPool is empty (too restrictive), we keep the current pool but record the choice
    // for a "fallback" or just proceed with the current pool to avoid 0 results.
    const finalNextPool = nextPool.length > 0 ? nextPool : currentPool;

    const newHistory = [...history, finalNextPool];
    setHistory(newHistory);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setResult(finalNextPool);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setHistory(history.slice(0, -1));
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setHistory([teaData]);
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-[600px] flex flex-col">
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="flex justify-between items-center">
              <button 
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`text-cream/40 hover:text-cream transition-colors ${currentStep === 0 ? 'invisible' : ''}`}
              >
                ← Back
              </button>
              <span className="text-xs uppercase tracking-widest text-cream/40">
                Question {currentStep + 1} of {questions.length}
              </span>
              <div className="w-10" /> {/* Spacer */}
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-3xl font-serif text-cream">{questions[currentStep].question}</h2>
              <p className="text-cream/30 text-sm">
                Remaining possibilities: {currentPool.length}
              </p>
            </div>

            <div className="grid gap-4">
              {questions[currentStep].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option.tags)}
                  className="w-full text-left p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-serif text-cream">Your Curated Selection</h2>
              <p className="text-cream/40">Based on your palette, these {result.length} teas remain:</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
              {result.map((tea) => (
                <div 
                  key={tea.id}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-serif text-cream">{tea.name}</h3>
                    <span className="text-[10px] uppercase tracking-tighter px-2 py-1 rounded bg-cream/10 text-cream/60">
                      {tea.type}
                    </span>
                  </div>
                  <p className="text-sm text-cream/40 mb-4">{tea.notes}</p>
                  <div className="flex flex-wrap gap-2">
                    {tea.tags.map(tag => (
                      <span key={tag} className="text-[10px] text-cream/30 border border-cream/10 px-2 py-0.5 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={resetQuiz}
                className="px-12 py-4 rounded-full bg-cream text-deep-green font-bold hover:bg-white transition-all duration-300 shadow-xl"
              >
                Start a New Journey
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
