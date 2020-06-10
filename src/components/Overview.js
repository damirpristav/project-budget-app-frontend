import React, { useContext, useRef, Fragment } from 'react';
import dateFormat from 'dateformat';

import TaskContext from '../context/taskContext';

const Overview = () => {
  const taskContext = useContext(TaskContext);
  const projectInfo = taskContext.projectInfo;
  const extraInfo = taskContext.extraInfo;
  const creatingPdf = taskContext.creatingPdf;
  const link = useRef();

  const downloadHandler = () => {
    const { tasks, projectInfo, extraInfo } = taskContext;
    let data = {
      projectInfo: {
        ...projectInfo,
        start: dateFormat(projectInfo.start, "dd.mm.yyyy")
      },
      tasks,
      totalPrice: extraInfo.totalPrice.toFixed(2),
      deliveryDate: dateFormat(extraInfo.deliveryDate, "dd.mm.yyyy")
    }
    taskContext.download(data, link);
  }

  return(
    <div className="overview">
      { Object.keys(extraInfo).length > 0 ?
        <Fragment>
          <div className="overview__box">
            <p className="overview__box_label">Project name</p>
            <p className="overview__box_text">{projectInfo.name}</p>
          </div>
          <div className="overview__box">
            <p className="overview__box_label">Client name</p>
            <p className="overview__box_text">{projectInfo.client}</p>
          </div>
          <div className="overview__box">
            <p className="overview__box_label">Number of tasks</p>
            <p className="overview__box_text">{extraInfo.tasks}</p>
          </div>
          <div className="overview__box">
            <p className="overview__box_label">Delivery date</p>
            <p className="overview__box_text">{dateFormat(extraInfo.deliveryDate, "dd.mm.yyyy")}</p>
          </div>
          <div className="overview__box overview__box--last">
            <p className="overview__box_label">Total price</p>
            <p className="overview__box_text">${extraInfo.totalPrice.toFixed(2)}</p>
          </div>
          <button className="btn btn--secondary" onClick={downloadHandler} disabled={creatingPdf}>
            { creatingPdf ? 'Creating PDF...' : 'Download as PDF' }
          </button>
          <a href="#/" download="Project_Budget.pdf" ref={link} style={{display: 'none'}}>Download</a>
        </Fragment>
        : <p>No data</p>
      }
    </div>
  );
}

export default Overview;