import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchItems,
  deleteItem,
  updateItem,
} from "../features/shoppingList/shoppingListSlice";

import { iconDataset } from "../miscellaneous/iconData";
import { trainModel, predictIcon } from "../miscellaneous/iconModel";

import ItemQuantity from "./ItemQuantity";

import {
  TextField,
  Typography,
  List,
  ListItem,
  IconButton,
  Avatar,
  ListItemText,
  ListItemAvatar,
  Grid,
  Switch,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

const ShoppingList = () => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempValue, setTempValue] = useState("");
  // Pt Iconite
  const [model, setModel] = useState(null);
  const [tokenizer, setTokenizer] = useState(null);

  const dispatch = useDispatch();
  const items = useSelector((state) => state.shoppingList.items);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  // Pt Iconite - tensorflow train?
  useEffect(() => {
    const initializeModel = async () => {
      const { model: trainedModel, vocab } = await trainModel(iconDataset);
      setModel(trainedModel);
      setTokenizer(vocab); // Setăm vocabularul ca tokenizer
    };

    initializeModel();
  }, []);

  const handleIconPrediction = (productName) => {
    if (!model || !tokenizer) {
      console.error("Model or tokenizer is not initialized.");
      return;
    }

    console.log("Predicting icon for:", productName);
    const icon = predictIcon(model, tokenizer, productName);

    if (icon) {
      console.log(`Suggested icon for "${productName}": ${icon}`);
    } else {
      console.error("No icon could be predicted.");
    }
    return icon || "none";
  };
  // const handleIconPrediction = (itemName) => {
  //   // Căutăm iconița pentru un element
  //   const iconItem = iconDataset.find(
  //     (item) => item.name.toLowerCase() === itemName.toLowerCase()
  //   );

  //   if (!iconItem) {
  //     console.log("Iconiță nu găsită pentru " + itemName);
  //     return null;
  //   }
  //   console.log("Iconiță pentru " + itemName + " is " + iconItem.icon);

  //   return iconItem.icon;
  // };
  //   const handleIconPrediction = (productName) => {
  //     console.log({ model, tokenizer });
  //     if (model && tokenizer) {
  //       const icon = predictIcon(model, tokenizer, productName);
  //       console.log(`Suggested icon for "${productName}": ${icon}`);
  //     }
  //   };

  const handleEdit = (id, item) => {
    // console.log({ id, item });
    dispatch(updateItem({ id, item }));
  };

  const handleEditClick = (index, value) => {
    setEditingIndex(index);
    // console.log('asd', value)
    setTempValue(value.name);
  };

  const handleSave = (item) => {
    handleEdit(item._id, item);
    setEditingIndex(null);
    setTempValue("");
  };

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <Grid item xs={12} md={6}>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Shopping List
      </Typography>

      <div>
        <h1>Shopping List with AI</h1>
        <button onClick={() => handleIconPrediction("Books")}>
          Predict Icon for Juice
        </button>
      </div>
      <List dense={true}>
        {items.map((item, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <div style={{ display: "flex", alignItems: "center" }}>
                <ItemQuantity item={item} onChange={handleSave} />
                <Switch
                  edge="end"
                  onChange={(e) =>
                    handleSave({ ...item, isPurchased: !item.isPurchased })
                  }
                  checked={item.isPurchased}
                  inputProps={{
                    "aria-labelledby": "switch-list-label-bluetooth",
                  }}
                />
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(item._id)}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(item._id)}
                >
                  <AutoFixHighIcon />
                </IconButton>
              </div>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />

                {/* {console.log(item)} */}
              </Avatar>
            </ListItemAvatar>
            {editingIndex === index ? (
              <TextField
                size="small"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                onBlur={(e) => handleSave({ ...item, name: e.target.value })} // Salvează când pierde focus
                autoFocus
              />
            ) : (
              <ListItemText
                onClick={() => handleEditClick(index, item)}
                primary={item.name}
                secondary={item.quantity}
              />
            )}

            {/* {console.log({item, index})}
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
              /> */}
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

export default ShoppingList;
