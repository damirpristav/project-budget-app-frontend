import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import TaskContext from '../context/taskContext';

const ProjectStart = props => {
  const [projectName, setProjectName] = useState('');
  const [clientName, setClientName] = useState('');
  const [startDate, setStartDate] = useState('');
  const taskContext = useContext(TaskContext);

  const submitHandler = (e) => {
    e.preventDefault();
    if(projectName.trim() === '' || clientName.trim() === '' || startDate.toString().trim() === '') {
      return alert('All fields are required');
    }

    const data = {
      name: projectName,
      client: clientName,
      start: startDate
    }
    taskContext.saveProjectInfo(data);
    props.onStepChange(2);
  }

  return(
    <form className="form" onSubmit={submitHandler}>
      <div className="form__group">
        <label>Project Name</label>
        <input type="text" name="projectName" placeholder="Project name" value={projectName} onChange={e => setProjectName(e.target.value)} />
      </div>
      <div className="form__group">
        <label>Client Name</label>
        <input type="text" name="clientName" placeholder="Client name" value={clientName} onChange={e => setClientName(e.target.value)} />
      </div>
      <div className="form__group">
        <label>Start Date</label>
        <DatePicker 
          selected={startDate}
          onChange={date => setStartDate(date)}
          dateFormat="dd.MM.yyyy"
          placeholderText="Start date"
        />
      </div>
      <button type="submit" className="btn">Continue</button>
    </form>
  );
}

export default ProjectStart;