import React, { useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import MoodSelector from './components/MoodSelector';
import RecipeCard from './components/RecipeCard';
import RecipeForm from './components/RecipeForm';

function App() {
  const [selectedMood, setSelectedMood] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);

  const fetchRecipes = async (mood) => {
    setSelectedMood(mood);
    setCurrent(0);
    const res = await fetch(`http://localhost:4000/api/recipes/${mood}`);
    setRecipes(await res.json());
  };

  const nextRecipe = () => setCurrent((c) => (c + 1) % recipes.length);

  const addRecipe = async (form) => {
    const response = await fetch('http://localhost:4000/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const newRecipe = await response.json();
  
    // If the new recipe's mood matches the selected mood, show it immediately
    if (newRecipe.mood === selectedMood) {
      setRecipes(prev => [newRecipe, ...prev]);
      setCurrent(0);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>Mood Recipe Finder</Typography>
      <MoodSelector selectedMood={selectedMood} onSelect={fetchRecipes} />
      <RecipeCard
        recipe={recipes[current]}
        onNext={nextRecipe}
        hasMultiple={recipes.length > 1}
      />
      <Button variant="contained" color="success" onClick={() => setOpen(true)}>Add Recipe</Button>
      <RecipeForm open={open} onClose={() => setOpen(false)} onAdd={addRecipe} />
    </Container>
  );
}

export default App; 