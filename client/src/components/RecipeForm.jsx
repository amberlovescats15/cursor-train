import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem
} from '@mui/material';

const MOODS = ['happy', 'sad', 'energetic', 'relaxed'];

export default function RecipeForm({ open, onClose, onAdd }) {
  const [form, setForm] = useState({
    name: '', mood: '', ingredients: '', instructions: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    await onAdd(form);
    setForm({ name: '', mood: '', ingredients: '', instructions: '' });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a Recipe</DialogTitle>
      <DialogContent>
        <TextField margin="dense" label="Name" name="name" fullWidth value={form.name} onChange={handleChange} />
        <TextField
          margin="dense"
          label="Mood"
          name="mood"
          select
          fullWidth
          value={form.mood}
          onChange={handleChange}
        >
          {MOODS.map(mood => <MenuItem key={mood} value={mood}>{mood}</MenuItem>)}
        </TextField>
        <TextField margin="dense" label="Ingredients (comma separated)" name="ingredients" fullWidth value={form.ingredients} onChange={handleChange} />
        <TextField margin="dense" label="Instructions" name="instructions" fullWidth multiline rows={3} value={form.instructions} onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Add</Button>
      </DialogActions>
    </Dialog>
  );
} 