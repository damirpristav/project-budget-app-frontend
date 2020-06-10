import React, { useReducer } from 'react';

import TaskContext from './taskContext';
import taskReducer from './taskReducer';
import * as types from './types';

const TaskState = props => {
  const initialState = {
    projectInfo: {},
    tasks: [],
    extraInfo: {},
    creatingPdf: false
  };
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Save project info
  const saveProjectInfo = data => {
    dispatch({
      type: types.SAVE_PROJECT_INFO,
      payload: data
    });
  }

  // Save tasks
  const saveTasks = data => {
    let days = 0;
    let totalPrice = 0;
    for(let key in data) {
      totalPrice += +data[key].cost;
      days += +data[key].days;
    }
    let deliveryDate = new Date(new Date(state.projectInfo.start).getTime() + (days * 24 * 60 * 60 * 1000));

    dispatch({
      type: types.SAVE_TASKS,
      payload: data,
      totalPrice,
      deliveryDate
    });
  }

  // Set creating pdf
  const setCreatingPdf = value => {
    dispatch({
      type: types.CREATING_PDF,
      payload: value
    });
  }

  // Download
  const download = async (body, link) => {
    try {
      setCreatingPdf(true);
      const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/generatePdf`, {
        method: 'POST',
        responseType: 'arraybuffer',
        headers: { 'Accept': 'application/pdf', 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const resData = await data.blob();
      setCreatingPdf(false);
      const blob = new Blob([resData], {type: 'application/pdf'});
      link.current.href = window.URL.createObjectURL(blob);
      link.current.click();
    }catch(err) {
      console.log(err);
      setCreatingPdf(false);
      alert('Something went wrong');
    }
  }

  return (
    <TaskContext.Provider
      value={{
        projectInfo: state.projectInfo,
        tasks: state.tasks,
        extraInfo: state.extraInfo,
        creatingPdf: state.creatingPdf,
        saveProjectInfo,
        saveTasks,
        download
      }}
    >
      {props.children}
    </TaskContext.Provider>
  )
}

export default TaskState;