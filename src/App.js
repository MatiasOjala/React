import React, { useState } from 'react';
import './App.css';
import { AgGridReact } from'ag-grid-react'
import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-material.css';
import { useRef } from 'react';
import {  BrowserRouter,  Routes,  Route,  Link} from"react-router-dom";
import Home from './components/Home';  
import Contact from './components/Contact';  
import About from './components/About'; 

function App() {
  const [todo, setTodo] = useState({desc: '', date: ''});
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, todo]);

  }
  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
       setTodos(todos.filter((todo, index) => 
        index !== gridRef.current.getSelectedNodes()[0].childIndex))
    }

  else {
    alert('Select row first');
  }}
  
  const columns = [
    {headerName: 'Date', field: 'date', filter: true, floatingFilter: true, sortable: true,},

    {headerName: 'Description', field: 'desc', filter: true, floatingFilter: true, sortable: true,},

    {headerName: 'Priority', field: 'priority', filter: true, floatingFilter: true, sortable: true, 
      cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}}
  ] 


  return (
    <div className="App">
      <form onSubmit={addTodo}>
        <h1>Todolist</h1>
        <div>
        <BrowserRouter>
    <Link to="/">Home</Link>{' '}
    <Link to="/about">About</Link>{' '}
    <Link to="/contact">Contact</Link>{' '}
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  </BrowserRouter>
  </div>
        <label htmlForm="date">Date: </label>
          <input type="date" name="date" value={todo.date} onChange={inputChanged} />

          <label htmlForm="desc">Description: </label>
          <input type="text" name="desc" value={todo.desc} onChange={inputChanged} />

          <label htmlForm="desc">Priority: </label>
          <input type="text" name="priority" value={todo.priority} onChange={inputChanged} />

          <input type="submit" value="Add" />
          
          <button onClick={deleteTodo}>Delete</button>
        <div className="ag-theme-material"style={{height: '700px', width: '70%', margin: 'auto'}} >
          <AgGridReact
        columnDefs={columns}
        rowData={todos}
        animtateRows={true}
        rowSelection="single"
        ref={gridRef}
        onGridReady={ params => gridRef.current = params.api }>
          </AgGridReact>
        </div>
      </form>
    </div>
  );
  }

export default App;
