import React from 'react';
import './App.css';

import TaskState from './context/taskState';
import Start from './components/Start';

function App() {
  return (
    <TaskState>
      <Start />
    </TaskState>
  );
}

export default App;
