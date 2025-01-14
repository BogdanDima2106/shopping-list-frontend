import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/items";

// Async Thunks
export const fetchItems = createAsyncThunk(
  "shoppingList/fetchItems",
  async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  }
);

export const addItem = createAsyncThunk(
  "shoppingList/addItem",
  async (item) => {
    const response = await axios.post(BASE_URL, item);
    return response.data;
  }
);

export const updateItem = createAsyncThunk(
  "shoppingList/updateItem",
  async ({ id, item }) => {
    const response = await axios.put(`${BASE_URL}/${id}`, item);
    // console.log('asd', {id, item})
    return response.data;
  }
);

export const deleteItem = createAsyncThunk(
  "shoppingList/deleteItem",
  async (id) => {
    // console.log(id)
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
  }
);

// Slice
const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState: {
    items: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export default shoppingListSlice.reducer;
