import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/shoppingList/shoppingListSlice';

const AddItemForm = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(addItem({ name, quantity }));
      setName('');
      setQuantity(1);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddItemForm;