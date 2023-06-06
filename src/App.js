import React  from 'react';
import './App.css';
import Header from './components/Header';
import Form from './components/Form';
import TodosList from './components/Todoslist';
import { TodoProvider } from './Context/TodoContext';

function App() {


  return (
    <div className="container">
      <div className='app-wrapper'>
        <div>
          <Header />
        </div>
        <div>
        <TodoProvider>
          <Form />
          <TodosList/>
        </TodoProvider>
      </div>
    </div>
  </div>
  );
}

export default App;
