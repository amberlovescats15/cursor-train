const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// SQLite setup
const db = new sqlite3.Database(path.join(__dirname, 'recipes.db'), (err) => {
  if (err) console.error(err);
  else console.log('Connected to SQLite database.');
});

// Create table and seed data if needed
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    mood TEXT NOT NULL,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL
  )`);

  db.get("SELECT COUNT(*) as count FROM recipes", (err, row) => {
    if (row.count === 0) {
      const sample = [
        // Happy
        ['Colorful Salad', 'happy', 'Lettuce, Tomato, Cucumber', 'Mix and serve.'],
        ['Fruit Parfait', 'happy', 'Yogurt, Granola, Mixed Berries, Honey', 'Layer yogurt, granola, and berries. Drizzle with honey.'],
        ['Lemon Cupcakes', 'happy', 'Flour, Sugar, Lemon, Eggs, Butter', 'Bake cupcakes and top with lemon frosting.'],
        // Sad
        ['Mac and Cheese', 'sad', 'Macaroni, Cheese, Milk', 'Cook pasta, add cheese.'],
        ['Chocolate Brownies', 'sad', 'Chocolate, Flour, Sugar, Eggs, Butter', 'Mix and bake until fudgy.'],
        ['Chicken Noodle Soup', 'sad', 'Chicken, Noodles, Carrots, Celery, Broth', 'Simmer all ingredients until cooked.'],
        // Energetic
        ['Energy Bowl', 'energetic', 'Quinoa, Chickpeas, Veggies', 'Mix and enjoy.'],
        ['Green Smoothie', 'energetic', 'Spinach, Banana, Almond Milk, Chia Seeds', 'Blend all ingredients until smooth.'],
        ['Peanut Butter Banana Toast', 'energetic', 'Whole Grain Bread, Peanut Butter, Banana, Honey', 'Spread peanut butter, top with banana and honey.'],
        // Relaxed
        ['Herbal Tea', 'relaxed', 'Tea, Honey', 'Steep and relax.'],
        ['Lavender Shortbread', 'relaxed', 'Flour, Butter, Sugar, Dried Lavender', 'Mix, shape, and bake until golden.'],
        ['Oatmeal Cookies', 'relaxed', 'Oats, Flour, Sugar, Butter, Raisins', 'Mix and bake until golden brown.']
      ];
      const stmt = db.prepare('INSERT INTO recipes (name, mood, ingredients, instructions) VALUES (?, ?, ?, ?)');
      sample.forEach(r => stmt.run(r));
      stmt.finalize();
    }
  });
});

// API: Get recipes by mood
app.get('/api/recipes/:mood', (req, res) => {
  db.all('SELECT * FROM recipes WHERE mood = ?', [req.params.mood], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// API: Add a recipe
app.post('/api/recipes', (req, res) => {
  const { name, mood, ingredients, instructions } = req.body;
  if (!name || !mood || !ingredients || !instructions) {
    return res.status(400).json({ error: 'All fields required' });
  }
  db.run(
    'INSERT INTO recipes (name, mood, ingredients, instructions) VALUES (?, ?, ?, ?)',
    [name, mood, ingredients, instructions],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, name, mood, ingredients, instructions });
    }
  );
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)); 