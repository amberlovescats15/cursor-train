import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

export default function RecipeCard({ recipe, onNext, hasMultiple }) {
  if (!recipe) return null;
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h5">{recipe.name}</Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>Ingredients:</Typography>
        <ul>
          {recipe.ingredients.split(',').map((ing, i) => (
            <li key={i}>{ing.trim()}</li>
          ))}
        </ul>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>Instructions:</Typography>
        <Typography>{recipe.instructions}</Typography>
        {hasMultiple && (
          <Button variant="outlined" sx={{ mt: 2 }} onClick={onNext}>Try Another Recipe</Button>
        )}
      </CardContent>
    </Card>
  );
} 