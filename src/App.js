import './App.css';
import react, { useState, useEffect } from 'react';
// import { Button } from '@material-ui/core';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, Input } from '@mui/material';
import Todo from './Todo';
import db from './firebasee';
import firebase from 'firebase/compat/app';
import {
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore/lite';
// import { getDatabase, ref, set } from 'firebase/database';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  console.log('rendering app');
  console.log('todos', todos);

  // when the app loads , we need to listen to the db and fetch new todos as they get added/removed
  const getData = async (db) => {
    const todoss = collection(db, 'todos');
    console.log('todoss is ', todoss);

    // const snapshot = await getDocs(todoss);
    // const todoList = snapshot.docs.map((doc) => doc.data().task);
    // console.log('todoList -> ', todoList);
    // setTodos(todoList);

    const q = query(todoss, orderBy('timestamp', 'desc'));
    const qsnap = await getDocs(q);
    // qsnap.forEach(function (doc) {
    //   console.log('doc -> ', doc.data());
    // });
    const todoList = qsnap.docs.map((doc) => {
      return { taskk: doc.data().task, id: doc.id };
    });
    setTodos(todoList);
    console.log('after ordering -> ', todoList);
  };
  useEffect(() => {
    // runs when the app loads !
    // we need to attach a listener to the db only once
    // every time the db changes fire of something
    // imagine a camera
    // db.collection('todos').onSnapshot((snapshot) => {
    //   // docs is the array of todos in the db !
    //   setTodos(
    //     snapshot.docs.map(
    //       (doc) =>
    //         // gives all the property of the todo
    //         // doc. data is and object !
    //         doc.data().task
    //       // this whole thing will bubble up into an array
    //       // and set into the todos , by
    //     )
    //   );
    // });

    console.log('getting inp');
    getData(db);
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const addTodo = async (ev) => {
    // adding to-do locally

    // console.log(ev);
    ev.preventDefault(); // will stop the refresh
    // setTodos([...todos, input]);

    // adding to dbs
    // db.collection('todos').add({
    //   todo: input,
    // });
    // we need to get firebases time stamp
    console.log('firebase timstamp');
    const docRef = await addDoc(collection(db, 'todos'), {
      task: input,
      // timestamp of the server !
      timestamp: firebase.firestore.Timestamp.now().seconds,
    });
    setInput('');
    getData(db);
  };

  return (
    <div className="App">
      <h1>Hello</h1>

      <form action="">
        <FormControl>
          <InputLabel>Enter to do</InputLabel>
          <Input type="text" value={input} onChange={handleChange} />
        </FormControl>
        <Button
          disabled={!input}
          color="primary"
          variant="contained"
          type="submit"
          onClick={addTodo}
        >
          Contained
        </Button>
      </form>

      <ul>
        {todos !== undefined &&
          todos.map((todo, idx) => {
            // return <li key={idx}> {todo} </li>;
            return <Todo todo={todo} key={todo.id} refetch={getData} />;
          })}
      </ul>
    </div>
  );
}

export default App;
