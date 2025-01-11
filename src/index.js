import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import shoppingListReducer from './features/shoppingList/shoppingListSlice';

// Configurarea store-ului Redux
const store = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
  },
});

// Crearea rădăcinii aplicației și utilizarea Provider
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
