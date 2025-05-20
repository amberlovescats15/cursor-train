import React from 'react';
import { Button, Box } from '@mui/material';

const MOODS = ['happy', 'sad', 'energetic', 'relaxed'];

export default function MoodSelector({ selectedMood, onSelect }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
      {MOODS.map(mood => (
        <Button
          key={mood}
          variant={selectedMood === mood ? 'contained' : 'outlined'}
          onClick={() => onSelect(mood)}
        >
          {mood.charAt(0).toUpperCase() + mood.slice(1)}
        </Button>
      ))}
    </Box>
  );
} 