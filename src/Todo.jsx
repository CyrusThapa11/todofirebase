import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography,
  Box,
} from '@mui/material';
import Button from '@mui/material/Button';
import db from './firebasee';
import {
  collection,
  query,
  doc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore/lite';
import DeleteIcon from '@mui/icons-material/Delete';

const Todo = ({ todo, refetch }) => {
  const [input, setInput] = useState(todo.taskk);
  const [ModalOpen, setModalOpen] = useState(false);
  console.log('rendering todo');

  const handleDelete = async () => {
    console.log('todo is ', todo);
    const collRef = collection(db, 'todos');
    console.log(collRef);
    const todoRef = doc(collRef, `${todo.id}`);
    console.log(todoRef);
    const res = await deleteDoc(todoRef);
    refetch(db);
  };

  const handleOpen = (value) => {
    setModalOpen(value);
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  // update todo :
  const updateTodo = async () => {
    // we need to set the changes here
    const res = await setDoc(
      doc(db, 'todos', `${todo.id}`),
      { task: input },
      { merge: true }
    );
    setModalOpen(false);
    refetch(db);
  };

  return (
    <>
      <div>
        <Modal
          open={ModalOpen}
          onClose={() => handleOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit this todo :
            </Typography>
            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={updateTodo}>UPDATE</Button>
          </Box>
        </Modal>
      </div>
      <List>
        <ListItem>
          <ListItemText primary={todo.taskk} />
        </ListItem>
        <Button onClick={() => handleOpen(true)}>EDIT</Button>
        <Button onClick={handleDelete}>
          <DeleteIcon />
        </Button>
      </List>
    </>
  );
};

export default Todo;
