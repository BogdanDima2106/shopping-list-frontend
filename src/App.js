import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchItems,
  deleteItem,
  updateItem,
} from "./features/shoppingList/shoppingListSlice";
import * as tf from "@tensorflow/tfjs";

import AddItemForm from "./components/AddItemForm";
import ShoppingList from "./components/ShoppingList";

const App = () => {
  useEffect(() => {
    const testTensorFlow = () => {
      const tensor = tf.tensor([1, 2, 3, 4]);
      console.log("TensorFlow is working!", tensor.toString());
    };
    testTensorFlow();
  }, []);
  return (
    <div>
      <AddItemForm />
      <ShoppingList />
    </div>
  );
};

export default App;
