import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchItems,
  deleteItem,
  updateItem,
} from "../features/shoppingList/shoppingListSlice";

import {
  TextField,
  Typography,
  List,
  Box,
  IconButton,
  Avatar,
  ListItemText,
  ListItemAvatar,
  Grid,
  Switch,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const ItemQuantity = (props) => {
  const { item, onChange } = props;
  const [quantity, setQuantity] = useState(item.quantity);

  const handleChange = (increment) => {
    setQuantity(quantity + (increment ? 1 : -1));
  };

  useEffect(() => {
    onChange({
      ...item,
      quantity: quantity,
    });
  }, [quantity]);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {/* {console.log("qqq", props, props.item.quantity)} */}
      {/* Buton pentru decrementare */}
      <IconButton
        onClick={() => handleChange(false)}
        disabled={item.quantity <= 1}
      >
        <RemoveIcon />
      </IconButton>

      {/* Cantitate curentă */}
      <span>{item?.quantity}</span>

      {/* Buton pentru incrementare */}
      <IconButton onClick={() => handleChange(true)}>
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default ItemQuantity;
