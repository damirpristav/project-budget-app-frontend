import React, { useState, useContext, Fragment } from 'react';

import AddTaskInput from './AddTaskInput';
import TaskContext from '../context/taskContext';

const AddTask = () => {
  const [tasks, setTasks] = useState([
    { id: 'task-1', name: '', days: '', cost: '' }
  ]);
  const [countTasks, setCountTasks] = useState(1);
  const taskContext = useContext(TaskContext);

  const addNewTaskHandler = () => {
    setTasks(prevTasks => [...prevTasks, { id: `task-${countTasks + 1}`, name: '', days: '', cost: '' }]);
    setCountTasks(prevCount => prevCount + 1);
  }

  const changeHandler = e => {
    if(['name', 'days', 'cost'].includes(e.target.className)) {
      const copiedTasks = [...tasks];
      copiedTasks[e.target.dataset.id][e.target.className] = e.target.value;
      setTasks(copiedTasks);
    }
  }

  const removeHandler = id => {
    const copiedTasks = [...tasks];
    if(window.confirm('Are you sure you want to remove this task ?')) {
      const filteredTasks = copiedTasks.filter(task => task.id !== id);
      setTasks(filteredTasks);
    }
  }

  const submitHandler = e => {
    e.preventDefault();
    for(let key in tasks) {
      if(tasks[key].name.trim() === '' || tasks[key].days.trim() === '' || tasks[key].cost.trim() === '') {
        return alert('Please remove tasks that has empty fields or fill them!');
      }
      if(!tasks[key].days.match(/^\d+$/)) {
        return alert('Days must be a number');
      }
      if(!tasks[key].cost.match(/^\d+$/)) {
        return alert('Cost must be a number');
      }
    }
    taskContext.saveTasks(tasks);
  }

  return(
    <Fragment>
      <button className="btn btn--small btn--secondary" onClick={addNewTaskHandler} style={{marginBottom: '40px'}}>Add new task</button>
      <form onSubmit={submitHandler}>
        {tasks.map((task, index) => 
          <AddTaskInput 
            key={index}
            id={index}
            taskId={task.id}
            task={task}
            onRemove={removeHandler}
            onChange={changeHandler}
          />
        )}
        <button className="btn">Update</button>
      </form>
    </Fragment>
  );
}

export default AddTask;