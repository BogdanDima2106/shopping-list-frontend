import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, deleteItem, updateItem } from './features/shoppingList/shoppingListSlice';

import AddItemForm from './components/AddItemForm'

const App = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.shoppingList.items);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteItem(id))
  }

  const handleEdit = (id, item) => {
    console.log({id, item})
    dispatch(updateItem({id, item}))
  }

  return (
    <div>
      <h1>Shopping List</h1>
      <AddItemForm />
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <button onClick={() => handleDelete(item._id)}>X</button>
            {item.name} - {item.quantity}
            <input 
              type="text"
              value={item.name}
              onChange={(e) => {
                // console.log(item)
                // console.log('asd', {id: item._id, item: {...item, name: e.target.value}})
                handleEdit(item._id, {...item, name: e.target.value})
              }}
            />
            <input 
              type="text"
              value={item.quantity}
              onChange={(e) => handleEdit(item._id, {...item, quantity: e.target.value})}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
