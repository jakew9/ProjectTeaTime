const fs = require('fs');

const teas = [
  // White
  { id: 1, name: "Silver Needle", tags: ["Delicate", "Sweet", "Honey", "Light", "Floral"] },
  { id: 2, name: "White Peony", tags: ["Floral", "Fresh", "Light", "Sweet", "Delicate"] },
  { id: 3, name: "Shou Mei", tags: ["Earthy", "Rich", "Bold", "Sweet"] },
  { id: 4, name: "Moonlight White", tags: ["Sweet", "Rich", "Floral", "Honey"] },
  { id: 5, name: "Gong Mei", tags: ["Earthy", "Bold", "Rich", "Sweet"] },
  { id: 6, name: "Ceylon White", tags: ["Clean", "Astringent", "Light", "Fresh"] },
  { id: 7, name: "Darjeeling White", tags: ["Floral", "Astringent", "Delicate", "Light"] },
  { id: 8, name: "Assam White", tags: ["Malty", "Rich", "Sweet", "Bold"] },
  { id: 9, name: "Kenya White Matcha", tags: ["Umami", "Fresh", "Bold", "Rich"] },
  { id: 10, name: "Nepal White", tags: ["Floral", "Sweet", "Delicate", "Honey"] },
  { id: 11, name: "Jasmine Silver Needle", tags: ["Floral", "Sweet", "Delicate", "Fresh"] },
  { id: 12, name: "Bai Hao Yinzhen", tags: ["Delicate", "Fresh", "Clean", "Light"] },
  { id: 13, name: "Aged White Tea (2014)", tags: ["Earthy", "Rich", "Bold", "Smoky"] },
  { id: 14, name: "Snow Dragon", tags: ["Fresh", "Clean", "Light", "Delicate"] },
  { id: 15, name: "White Matcha", tags: ["Umami", "Fresh", "Rich", "Creamy"] },
  { id: 16, name: "African White", tags: ["Fruity", "Sweet", "Light", "Fresh"] },
  { id: 17, name: "Taiwan White", tags: ["Floral", "Honey", "Light", "Delicate"] },
  { id: 18, name: "Korean White", tags: ["Savory", "Umami", "Clean", "Fresh"] },
  { id: 19, name: "Indonesian White", tags: ["Floral", "Delicate", "Fresh", "Fruity"] },
  { id: 20, name: "Wild Tree White", tags: ["Bold", "Earthy", "Rich", "Mineral"] },

  // Green
  { id: 21, name: "Dragon Well (Longjing)", tags: ["Umami", "Roasted", "Clean", "Fresh", "Sweet"] },
  { id: 22, name: "Sencha", tags: ["Fresh", "Grassy", "Astringent", "Clean"] },
  { id: 23, name: "Gyokuro", tags: ["Umami", "Rich", "Savory", "Sweet"] },
  { id: 24, name: "Matcha", tags: ["Umami", "Bold", "Rich", "Creamy", "Grassy"] },
  { id: 25, name: "Genmaicha", tags: ["Roasted", "Rich", "Savory", "Grassy"] },
  { id: 26, name: "Hojicha", tags: ["Roasted", "Smoky", "Rich", "Earthy"] },
  { id: 27, name: "Bi Luo Chun", tags: ["Floral", "Fruity", "Fresh", "Delicate"] },
  { id: 28, name: "Gunpowder Green", tags: ["Smoky", "Bold", "Astringent", "Roasted"] },
  { id: 29, name: "Huangshan Mao Feng", tags: ["Floral", "Sweet", "Fresh", "Light"] },
  { id: 30, name: "Kukicha", tags: ["Fresh", "Sweet", "Light", "Grassy"] },
  { id: 31, name: "Jasmine Pearls", tags: ["Floral", "Sweet", "Fresh", "Delicate"] },
  { id: 32, name: "Anji Bai Cha", tags: ["Delicate", "Umami", "Fresh", "Sweet"] },
  { id: 33, name: "Taiping Houkui", tags: ["Floral", "Clean", "Light", "Delicate"] },
  { id: 34, name: "Kamairicha", tags: ["Roasted", "Sweet", "Clean", "Fresh"] },
  { id: 35, name: "Lu'an Melon Seed", tags: ["Roasted", "Bold", "Fresh", "Grassy"] },
  { id: 36, name: "Tamaryokucha", tags: ["Fruity", "Umami", "Fresh", "Sweet"] },
  { id: 37, name: "Yunnan Green", tags: ["Bold", "Sweet", "Fresh", "Fruity"] },
  { id: 38, name: "Bancha", tags: ["Grassy", "Bold", "Astringent", "Clean"] },
  { id: 39, name: "Kokeicha", tags: ["Grassy", "Clean", "Bold", "Umami"] },
  { id: 40, name: "Shincha", tags: ["Fresh", "Sweet", "Umami", "Grassy"] },

  // Oolong
  { id: 41, name: "Tie Guan Yin", tags: ["Floral", "Creamy", "Fresh", "Sweet"] },
  { id: 42, name: "Da Hong Pao", tags: ["Roasted", "Mineral", "Bold", "Rich", "Smoky"] },
  { id: 43, name: "Dong Ding", tags: ["Roasted", "Sweet", "Rich", "Floral"] },
  { id: 44, name: "Ali Shan", tags: ["Floral", "Creamy", "Sweet", "Light"] },
  { id: 45, name: "Milk Oolong (Jin Xuan)", tags: ["Creamy", "Sweet", "Light", "Floral"] },
  { id: 46, name: "Oriental Beauty", tags: ["Fruity", "Honey", "Sweet", "Delicate"] },
  { id: 47, name: "Duck Shit Oolong", tags: ["Floral", "Bold", "Rich", "Fruity"] },
  { id: 48, name: "Rou Gui", tags: ["Spicy", "Roasted", "Bold", "Mineral"] },
  { id: 49, name: "Shui Xian", tags: ["Mineral", "Roasted", "Rich", "Earthy"] },
  { id: 50, name: "Four Springs Oolong", tags: ["Floral", "Fresh", "Light", "Sweet"] },
  { id: 51, name: "Honey Orchid Dan Cong", tags: ["Fruity", "Floral", "Sweet", "Honey"] },
  { id: 52, name: "Shan Lin Xi", tags: ["Fresh", "Clean", "Light", "Floral"] },
  { id: 53, name: "Li Shan", tags: ["Floral", "Sweet", "Delicate", "Fresh"] },
  { id: 54, name: "Phoenix Dan Cong", tags: ["Floral", "Fruity", "Bold", "Sweet"] },
  { id: 55, name: "Charcoal Roasted Oolong", tags: ["Roasted", "Smoky", "Bold", "Rich"] },
  { id: 56, name: "Osmanthus Oolong", tags: ["Floral", "Sweet", "Light", "Fruity"] },
  { id: 57, name: "Gao Shan", tags: ["Fresh", "Clean", "Sweet", "Floral"] },
  { id: 58, name: "Aged Oolong (10 Year)", tags: ["Earthy", "Rich", "Bold", "Roasted"] },
  { id: 59, name: "GABA Oolong", tags: ["Fruity", "Rich", "Sweet", "Bold"] },
  { id: 60, name: "Black Oolong", tags: ["Roasted", "Bold", "Rich", "Earthy"] },

  // Black
  { id: 61, name: "Assam Breakfast", tags: ["Malty", "Bold", "Rich", "Astringent"] },
  { id: 62, name: "Darjeeling First Flush", tags: ["Floral", "Astringent", "Clean", "Fresh"] },
  { id: 63, name: "Keemun", tags: ["Smoky", "Sweet", "Rich", "Fruity"] },
  { id: 64, name: "Lapsang Souchong", tags: ["Smoky", "Bold", "Roasted", "Earthy"] },
  { id: 65, name: "Yunnan Gold", tags: ["Sweet", "Malty", "Rich", "Honey"] },
  { id: 66, name: "Ceylon Orange Pekoe", tags: ["Clean", "Bold", "Astringent", "Fresh"] },
  { id: 67, name: "Earl Grey", tags: ["Floral", "Clean", "Bold", "Fruity"] },
  { id: 68, name: "Golden Monkey", tags: ["Fruity", "Rich", "Sweet", "Malty"] },
  { id: 69, name: "Kenya Black", tags: ["Bold", "Rich", "Malty", "Astringent"] },
  { id: 70, name: "Nepal Black", tags: ["Floral", "Sweet", "Rich", "Honey"] },
  { id: 71, name: "Nilgiri", tags: ["Fresh", "Clean", "Light", "Fruity"] },
  { id: 72, name: "Lapsang Unsmoked", tags: ["Sweet", "Fruity", "Rich", "Malty"] },
  { id: 73, name: "Ruby 18", tags: ["Spicy", "Cooling", "Bold", "Sweet"] },
  { id: 74, name: "Tanzania Black", tags: ["Earthy", "Bold", "Rich", "Malty"] },
  { id: 75, name: "Wild Black Tea", tags: ["Bold", "Roasted", "Rich", "Earthy"] },
  { id: 76, name: "Yingde Hong", tags: ["Sweet", "Rich", "Malty", "Bold"] },
  { id: 77, name: "Turkish Rize", tags: ["Astringent", "Bold", "Clean", "Malty"] },
  { id: 78, name: "Irish Breakfast", tags: ["Malty", "Bold", "Rich", "Astringent"] },
  { id: 79, name: "Sun Moon Lake Black", tags: ["Spicy", "Sweet", "Rich", "Malty"] },
  { id: 80, name: "Kyoto Black", tags: ["Smoky", "Roasted", "Rich", "Earthy"] },

  // Pu-erh & Dark
  { id: 81, name: "7542 Raw Pu-erh", tags: ["Earthy", "Astringent", "Floral", "Bold"] },
  { id: 82, name: "Sticky Rice Pu-erh", tags: ["Savory", "Sweet", "Rich", "Earthy"] },
  { id: 83, name: "Old Arbor Ripe Pu-erh", tags: ["Earthy", "Rich", "Creamy", "Sweet"] },
  { id: 84, name: "Tangerine Stuffed Pu-erh", tags: ["Fruity", "Earthy", "Clean", "Sweet"] },
  { id: 85, name: "Purple Bud Raw Pu-erh", tags: ["Astringent", "Floral", "Bold", "Earthy"] },
  { id: 86, name: "Bulang Mountain Raw", tags: ["Bold", "Astringent", "Sweet", "Earthy"] },
  { id: 87, name: "Menghai Star Ripe", tags: ["Rich", "Earthy", "Sweet", "Creamy"] },
  { id: 88, name: "Yiwu Mountain Raw", tags: ["Sweet", "Floral", "Delicate", "Earthy"] },
  { id: 89, name: "Jingmai Ancient Tree", tags: ["Floral", "Honey", "Fresh", "Earthy"] },
  { id: 90, name: "Lincang Dragon Balls", tags: ["Fresh", "Floral", "Bold", "Sweet"] },
  { id: 91, name: "Golden Needle White Lotus", tags: ["Creamy", "Sweet", "Rich", "Earthy"] },
  { id: 92, name: "Lao Banzhang Raw", tags: ["Bold", "Smoky", "Rich", "Astringent"] },
  { id: 93, name: "V93 Ripe Tuocha", tags: ["Earthy", "Bold", "Savory", "Rich"] },
  { id: 94, name: "Imperial Grade Ripe", tags: ["Creamy", "Sweet", "Rich", "Earthy"] },
  { id: 95, name: "Aged Raw (1990s)", tags: ["Earthy", "Smoky", "Cooling", "Rich"] },
  { id: 96, name: "Nannuo Mountain Raw", tags: ["Sweet", "Earthy", "Floral", "Clean"] },
  { id: 97, name: "Hekai Mountain Raw", tags: ["Honey", "Fresh", "Bold", "Earthy"] },
  { id: 98, name: "Lao Cha Tou", tags: ["Sweet", "Rich", "Earthy", "Creamy"] },
  { id: 99, name: "7581 Ripe Brick", tags: ["Bold", "Rich", "Earthy", "Smoky"] },
  { id: 100, name: "Wild Gushu Raw", tags: ["Bold", "Rich", "Earthy", "Floral"] },

  // Yellow, Purple & Rarities
  { id: 101, name: "Junshan Yinzhen", tags: ["Sweet", "Roasted", "Delicate", "Fresh"] },
  { id: 102, name: "Mengding Huangya", tags: ["Floral", "Sweet", "Fresh", "Roasted"] },
  { id: 103, name: "Huoshan Huangya", tags: ["Roasted", "Clean", "Light", "Fresh"] },
  { id: 104, name: "Kenyan Purple Tea", tags: ["Fruity", "Sweet", "Bold", "Earthy"] },
  { id: 105, name: "Purple Ye Sheng", tags: ["Astringent", "Bold", "Floral", "Earthy"] },
  { id: 106, name: "Bei Dou Rock Tea", tags: ["Mineral", "Roasted", "Rich", "Bold"] },
  { id: 107, name: "Sparrow's Tongue", tags: ["Floral", "Roasted", "Sweet", "Mineral"] },
  { id: 108, name: "Iron Arhat", tags: ["Bold", "Roasted", "Mineral", "Earthy"] },
  { id: 109, name: "Kabusecha", tags: ["Sweet", "Umami", "Fresh", "Savory"] },
  { id: 110, name: "Eight Immortals", tags: ["Floral", "Honey", "Bold", "Fruity"] },
  { id: 111, name: "Anhua Dark Tea", tags: ["Smoky", "Earthy", "Bold", "Savory"] },
  { id: 112, name: "Liu Bao", tags: ["Earthy", "Rich", "Cooling", "Sweet"] },
  { id: 113, name: "Fu Brick Tea", tags: ["Earthy", "Rich", "Bold", "Savory"] },
  { id: 114, name: "Taiping Houkui (Selected)", tags: ["Floral", "Clean", "Light", "Delicate"] },
  { id: 115, name: "Himalayan Orange", tags: ["Fruity", "Sweet", "Clean", "Fresh"] },
  { id: 116, name: "Ruby #18 Black", tags: ["Spicy", "Cooling", "Bold", "Sweet"] },
  { id: 117, name: "Yellow Sun Gold", tags: ["Sweet", "Honey", "Light", "Roasted"] },
  { id: 118, name: "Purple Needle Black", tags: ["Sweet", "Fruity", "Rich", "Malty"] },
  { id: 119, name: "Wild Purple White", tags: ["Floral", "Delicate", "Light", "Fresh"] },
  { id: 120, name: "Ancient Tree Yellow", tags: ["Rich", "Sweet", "Earthy", "Roasted"] },

  // Herbal
  { id: 121, name: "Chamomile", tags: ["Sweet", "Floral", "Delicate", "Light"] },
  { id: 122, name: "Peppermint", tags: ["Fresh", "Clean", "Cooling", "Sweet"] },
  { id: 123, name: "Rooibos", tags: ["Earthy", "Sweet", "Rich", "Honey"] },
  { id: 124, name: "Hibiscus", tags: ["Astringent", "Clean", "Fruity", "Fresh"] },
  { id: 125, name: "Ginger", tags: ["Spicy", "Bold", "Earthy", "Sweet"] },
  { id: 126, name: "Lemon Verbena", tags: ["Fresh", "Clean", "Light", "Fruity"] },
  { id: 127, name: "Valerian Root", tags: ["Earthy", "Bold", "Rich", "Savory"] },
  { id: 128, name: "Honeybush", tags: ["Sweet", "Floral", "Rich", "Honey"] },
  { id: 129, name: "Lavender", tags: ["Floral", "Bold", "Delicate", "Fresh"] },
  { id: 130, name: "Holy Basil (Tulsi)", tags: ["Spicy", "Fresh", "Bold", "Earthy"] },
  { id: 131, name: "Raspberry Leaf", tags: ["Earthy", "Bold", "Clean", "Fruity"] },
  { id: 132, name: "Nettle Leaf", tags: ["Grassy", "Bold", "Clean", "Savory"] },
  { id: 133, name: "Chrysanthemum", tags: ["Floral", "Fresh", "Clean", "Cooling"] },
  { id: 134, name: "Dandelion Root", tags: ["Roasted", "Earthy", "Rich", "Bold"] },
  { id: 135, name: "Barley Tea (Mugicha)", tags: ["Roasted", "Rich", "Sweet", "Earthy"] },
  { id: 136, name: "Yerba Mate", tags: ["Grassy", "Bold", "Astringent", "Earthy"] },
  { id: 137, name: "Guayusa", tags: ["Sweet", "Grassy", "Clean", "Fresh"] },
  { id: 138, name: "Rose Buds", tags: ["Floral", "Sweet", "Delicate", "Light"] },
  { id: 139, name: "Turmeric", tags: ["Earthy", "Spicy", "Bold", "Rich"] },
  { id: 140, name: "Cinnamon", tags: ["Spicy", "Sweet", "Bold", "Roasted"] }
];

// Write Task 1
fs.writeFileSync('task1.json', JSON.stringify(teas, null, 2));

// Task 2: Frequencies
const freqs = {};
teas.forEach(t => {
  t.tags.forEach(tag => {
    freqs[tag] = (freqs[tag] || 0) + 1;
  });
});
const sortedFreqs = Object.entries(freqs).sort((a,b) => b[1] - a[1]);
fs.writeFileSync('task2.txt', sortedFreqs.map(f => `${f[0]}: ${f[1]}`).join('\n'));

// Task 4: Simulate
function runSim(userChoices) {
  let pool = teas.map(t => t.id);
  let scores = {};
  teas.forEach(t => scores[t.id] = 0);

  let output = [];
  for(let step = 0; step < userChoices.length; step++) {
    const choiceTags = userChoices[step];
    teas.forEach(t => {
      const matches = t.tags.filter(tag => choiceTags.includes(tag)).length;
      scores[t.id] += matches;
    });

    const pruneCount = Math.max(1, Math.floor(pool.length * 0.23));
    const nextPoolSize = pool.length - pruneCount;

    pool = [...pool]
      .sort((a, b) => scores[b] - scores[a])
      .slice(0, Math.max(nextPoolSize, 10));

    output.push(`Step ${step+1}: Pool size ${pool.length}`);
  }
  
  const finalTeas = teas.filter(t => pool.includes(t.id)).sort((a, b) => scores[b] - scores[a]);
  output.push('Final Teas: ' + finalTeas.map(t => `${t.name} (Score: ${scores[t.id]})`).join(', '));
  return output.join('\n');
}

const userA = [
  ["Smoky", "Bold", "Rich", "Earthy"], // Q1 rye
  ["Smoky", "Bold", "Rich", "Roasted"], // Q2 brisket
  ["Roasted", "Smoky", "Rich", "Bold"], // Q3 roasted
  ["Bold", "Smoky", "Rich", "Roasted"], // Q4 coffee
  ["Bold", "Earthy", "Roasted", "Smoky"], // Q5 robust
  ["Smoky", "Bold", "Roasted", "Rich"], // Q6 wood fire
  ["Smoky", "Bold", "Rich", "Roasted"], // Q7 stormy sky
  ["Smoky", "Roasted", "Rich", "Earthy"], // Q8 mountain cabin
  ["Earthy", "Rich", "Sweet", "Malty"], // Q9 sun dried figs (closest to rich/earthy)
  ["Bold", "Smoky", "Roasted", "Malty"] // Q10 strong assertive
];

const userB = [
  ["Floral", "Delicate", "Sweet", "Fresh"], // Q1 macaron
  ["Clean", "Fresh", "Umami", "Light"], // Q2 sashimi
  ["Sweet", "Delicate", "Light", "Honey"], // Q3 silky
  ["Delicate", "Floral", "Fresh", "Light"], // Q4 misty garden
  ["Delicate", "Light", "Floral", "Fresh"], // Q5 light
  ["Floral", "Delicate", "Fresh", "Light"], // Q6 jasmine
  ["Floral", "Honey", "Light", "Sweet"], // Q7 afternoon sun
  ["Floral", "Delicate", "Light", "Fresh"], // Q8 alpine meadow
  ["Floral", "Sweet", "Delicate", "Light"], // Q9 white peaches
  ["Delicate", "Light", "Floral", "Fresh"] // Q10 whisper
];

fs.writeFileSync('task4.txt', 'USER A (Bold/Smoky/Rich/Roasted):\n' + runSim(userA) + '\n\nUSER B (Floral/Delicate/Light/Fresh):\n' + runSim(userB));
