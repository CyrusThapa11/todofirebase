import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const Todo = ({ todo }) => {
  return (
    <List>
      <ListItem>
        <ListItemText primary={todo} />
      </ListItem>
    </List>
  );
};

export default Todo;
