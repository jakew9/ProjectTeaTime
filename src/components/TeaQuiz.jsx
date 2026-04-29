import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import teaData from '../data/teaData.json';

const TAG_WEIGHTS = {
  // Anchor Tags: Polarizing or identity-defining (Score: 2)
  "Smoky": 2,
  "Umami": 2,
  "Mineral": 2,
  "Cooling": 2,
  "Spicy": 2,
  "Grassy": 2,
  "Malty": 2,
  "Roasted": 2,
  
  // Structural Tags: Supporting texture and body (Score: 1)
  "Bold": 1,
  "Clean": 1,
  "Fresh": 1,
  "Light": 1,
  "Delicate": 1,
  "Floral": 1,
  "Sweet": 1,
  "Honey": 1,
  "Rich": 1,
  "Creamy": 1,
  "Earthy": 1,
  "Savory": 1,
  "Astringent": 1,
  "Fruity": 1
};

const questions = [
  {
    id: 1,
    question: "What's your ideal morning ritual?",
    options: [
      { text: "Strong, dark coffee and a newspaper", tags: ["Bold", "Rich", "Earthy"] },
      { text: "A bowl of fresh berries and yogurt", tags: ["Sweet", "Clean", "Light", "Fresh"] },
      { text: "Steamed rice and warm broth", tags: ["Umami", "Rich", "Earthy"] },
      { text: "A quiet walk in a misty garden", tags: ["Delicate", "Floral", "Fresh", "Light"] },
      { text: "Hot water with lemon and honey", tags: ["Clean", "Fresh", "Sweet", "Honey"] }
    ]
  },
  {
    id: 2,
    question: "What's your favorite weather for a walk?",
    options: [
      { text: "Hot and tropical", tags: ["Fruity", "Fresh", "Sweet", "Floral"] },
      { text: "Crisp, cold winter air", tags: ["Clean", "Astringent", "Bold"] },
      { text: "Misty and mysterious", tags: ["Earthy", "Delicate", "Rich"] },
      { text: "Golden afternoon sun", tags: ["Floral", "Honey", "Light", "Sweet"] },
      { text: "A stormy, dark sky", tags: ["Bold", "Rich", "Earthy"] }
    ]
  },
  {
    id: 3,
    question: "Which texture do you find most satisfying?",
    options: [
      { text: "Velvety and mouth-coating", tags: ["Rich", "Creamy", "Sweet"] },
      { text: "Crisp and effervescent", tags: ["Clean", "Astringent", "Fresh", "Light"] },
      { text: "Light and airy", tags: ["Delicate", "Light", "Floral", "Fresh"] },
      { text: "Robust and thick", tags: ["Bold", "Earthy", "Rich"] },
      { text: "Smooth and restorative", tags: ["Sweet", "Fresh", "Clean"] }
    ]
  },
  {
    id: 4,
    question: "What's your preferred evening entree?",
    options: [
      { text: "Smoked brisket with BBQ sauce", tags: ["Smoky", "Bold", "Rich"] },
      { text: "Fresh Sashimi platter", tags: ["Clean", "Fresh", "Umami", "Light"] },
      { text: "Creamy mushroom risotto", tags: ["Creamy", "Rich", "Earthy", "Umami"] },
      { text: "Spicy Thai green curry", tags: ["Bold", "Fresh", "Astringent", "Earthy"] },
      { text: "Roasted root vegetables", tags: ["Roasted", "Earthy", "Sweet", "Bold"] }
    ]
  },
  {
    id: 5,
    question: "Which fruit do you crave most?",
    options: [
      { text: "Dark, ripe cherries", tags: ["Rich", "Sweet", "Fruity", "Bold"] },
      { text: "Tart green apples", tags: ["Astringent", "Clean", "Fresh", "Light"] },
      { text: "Creamy white peaches", tags: ["Floral", "Sweet", "Delicate", "Light"] },
      { text: "Exotic lychee or mango", tags: ["Fruity", "Honey", "Fresh", "Floral"] },
      { text: "Sun-dried figs", tags: ["Earthy", "Rich", "Sweet"] }
    ]
  },
  {
    id: 6,
    question: "Which bakery treat calls your name?",
    options: [
      { text: "Flaky, buttery croissant", tags: ["Rich", "Creamy", "Sweet", "Light"] },
      { text: "Dark chocolate rye bread", tags: ["Bold", "Rich", "Earthy", "Roasted"] },
      { text: "Lemon-glazed shortbread", tags: ["Clean", "Light", "Fresh", "Sweet"] },
      { text: "Almond macaron", tags: ["Floral", "Delicate", "Sweet", "Fresh"] },
      { text: "Toasted sesame flatbread", tags: ["Roasted", "Umami", "Bold"] }
    ]
  },
  {
    id: 7,
    question: "Close your eyes. What scent fills the air?",
    options: [
      { text: "A crackling wood fire", tags: ["Smoky", "Bold", "Roasted"] },
      { text: "Blooming jasmine on a breeze", tags: ["Floral", "Delicate", "Fresh", "Light"] },
      { text: "Damp earth after rain", tags: ["Earthy", "Umami", "Astringent", "Bold"] },
      { text: "Caramelizing sugar", tags: ["Sweet", "Rich", "Honey"] },
      { text: "Freshly cut grass", tags: ["Grassy", "Fresh", "Clean", "Light"] }
    ]
  },
  {
    id: 8,
    question: "How do you like a meal to finish?",
    options: [
      { text: "A clean, vegetal snap", tags: ["Grassy", "Clean", "Astringent", "Fresh"] },
      { text: "A lingering, silky sweetness", tags: ["Sweet", "Delicate", "Light", "Honey"] },
      { text: "A warm, roasted embrace", tags: ["Roasted", "Rich", "Bold"] },
      { text: "A deep, earthy depth", tags: ["Earthy", "Bold", "Rich"] },
      { text: "A bright, fruity zing", tags: ["Fruity", "Sweet", "Clean", "Fresh"] }
    ]
  },
  {
    id: 9,
    question: "Pick a vacation destination:",
    options: [
      { text: "A bustling spice market", tags: ["Spicy", "Bold", "Rich", "Earthy"] },
      { text: "A serene alpine meadow", tags: ["Floral", "Delicate", "Light", "Fresh"] },
      { text: "A rugged coastal cliff", tags: ["Mineral", "Astringent", "Clean", "Fresh"] },
      { text: "An antique wooden library", tags: ["Malty", "Rich", "Earthy"] },
      { text: "A lush, green rainforest", tags: ["Grassy", "Fresh", "Umami", "Bold"] }
    ]
  },
  {
    id: 10,
    question: "What's your preferred level of intensity?",
    options: [
      { text: "Soft and whisper-light", tags: ["Delicate", "Light", "Floral", "Fresh"] },
      { text: "Cool and deeply refreshing", tags: ["Cooling", "Clean", "Astringent", "Sweet"] },
      { text: "Rich, broth-like, and meditative", tags: ["Savory", "Umami", "Rich", "Earthy"] },
      { text: "Strong, assertive, and malty", tags: ["Malty", "Bold", "Rich", "Roasted"] },
      { text: "Wild, smoky, and untamed", tags: ["Smoky", "Bold", "Earthy"] }
    ]
  }
];

export default function TeaQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [teaScores, setTeaScores] = useState(
    teaData.reduce((acc, tea) => ({ ...acc, [tea.id]: 0 }), {})
  );
  const [maxPossibleScore, setMaxPossibleScore] = useState(0);
  const [history, setHistory] = useState([{ pool: teaData.map(t => t.id), maxScore: 0 }]);
  const [result, setResult] = useState(null);

  const currentPoolIds = history[history.length - 1].pool;

  const handleAnswer = (selectedTags) => {
    // 1. Calculate Weighted Scores and track potential max
    const newScores = { ...teaScores };
    let questionMax = 0;
    
    selectedTags.forEach(tag => {
      questionMax += TAG_WEIGHTS[tag] || 1;
    });

    const newMaxPossible = maxPossibleScore + questionMax;
    setMaxPossibleScore(newMaxPossible);

    teaData.forEach(tea => {
      const matches = tea.tags.filter(tag => selectedTags.includes(tag));
      matches.forEach(tag => {
        newScores[tea.id] += TAG_WEIGHTS[tag] || 1; 
      });
    });
    setTeaScores(newScores);

    // 2. Dynamic Threshold Pruning
    const currentMaxScore = Math.max(...currentPoolIds.map(id => newScores[id]));
    const dynamicThreshold = currentMaxScore * 0.40;

    let nextPoolIds = currentPoolIds.filter(id => newScores[id] >= dynamicThreshold);

    if (nextPoolIds.length < 12) {
      nextPoolIds = [...currentPoolIds]
        .sort((a, b) => newScores[b] - newScores[a])
        .slice(0, Math.min(currentPoolIds.length, 12));
    } else {
      nextPoolIds.sort((a, b) => newScores[b] - newScores[a]);
    }

    const newHistory = [...history, { pool: nextPoolIds, maxScore: newMaxPossible }];
    setHistory(newHistory);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const finalTeas = teaData
        .filter(t => nextPoolIds.includes(t.id))
        .map(tea => ({
          ...tea,
          matchPercent: Math.round((newScores[tea.id] / newMaxPossible) * 100)
        }))
        .sort((a, b) => b.matchPercent - a.matchPercent);
      setResult(finalTeas);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      const previousState = history[history.length - 2];
      setCurrentStep(currentStep - 1);
      setMaxPossibleScore(previousState.maxScore);
      setHistory(history.slice(0, -1));
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setTeaScores(teaData.reduce((acc, tea) => ({ ...acc, [tea.id]: 0 }), {}));
    setMaxPossibleScore(0);
    setHistory([{ pool: teaData.map(t => t.id), maxScore: 0 }]);
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
              <span className="text-xs uppercase tracking-widest text-cream/40 font-body">
                Step {currentStep + 1} of {questions.length}
              </span>
              <div className="w-10" />
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-3xl md:text-4xl font-serif text-cream leading-tight">{questions[currentStep].question}</h2>
              <p className="text-cream/30 text-sm font-body tracking-widest uppercase">
                Potential matches: {currentPoolIds.length}
              </p>
            </div>

            <div className="grid gap-3">
              {questions[currentStep].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option.tags)}
                  className="w-full text-left p-4 md:p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                  <span className="text-lg font-body text-cream/70 group-hover:text-cream transition-colors">
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
              <h2 className="text-4xl md:text-5xl font-serif text-cream">Your Personal Sanctuary</h2>
              <p className="text-cream/40 font-body">We've discovered {result.length} teas that align with your palette.</p>
            </div>

            {/* Top 5 Section */}
            <section className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-px flex-grow bg-cream/10" />
                <h3 className="text-xs uppercase tracking-[0.3em] text-cream/60 font-body">Top 5 Soul Matches</h3>
                <div className="h-px flex-grow bg-cream/10" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {result.slice(0, 5).map((tea, idx) => (
                  <div 
                    key={tea.id}
                    className="p-5 rounded-2xl bg-cream/5 border border-cream/20 hover:border-cream/40 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-cream/20 group-hover:bg-cream transition-colors" />
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] text-cream/30 font-bold">MATCH 0{idx + 1}</span>
                      <span className="text-[10px] text-cream/80 font-bold bg-cream/10 px-1.5 py-0.5 rounded">{tea.matchPercent}%</span>
                    </div>
                    <h3 className="text-lg font-serif text-cream mb-1 leading-tight">{tea.name}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-cream/40 mb-3">{tea.type}</p>
                    <p className="text-xs text-cream/60 italic leading-relaxed">"{tea.notes}"</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Remaining Teas Section */}
            {result.length > 5 && (
              <section className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="h-px flex-grow bg-cream/5" />
                  <h3 className="text-xs uppercase tracking-[0.3em] text-cream/30 font-body">Other Compatible Finds</h3>
                  <div className="h-px flex-grow bg-cream/5" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                  {result.slice(5).map((tea) => (
                    <div 
                      key={tea.id}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-sm font-serif text-cream/80 group-hover:text-white transition-colors">{tea.name}</h4>
                        <span className="text-[8px] font-bold text-cream/60">{tea.matchPercent}%</span>
                      </div>
                      <p className="text-[10px] text-cream/30 italic">"{tea.notes}"</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="text-center pb-8">
              <button
                onClick={resetQuiz}
                className="px-12 py-4 rounded-full bg-cream text-[#062c16] font-bold hover:bg-white transition-all duration-300 shadow-xl uppercase tracking-widest text-sm font-body"
              >
                Reset Journey
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
