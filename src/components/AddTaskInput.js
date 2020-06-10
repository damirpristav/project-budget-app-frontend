import React from 'react';

const AddTaskInput = props => {
  return(
    <div className="task">
      <div className="form__group task__name">
        <label>Task Name</label>
        <input type="text" name="name" placeholder="Task name" id={`name-${props.taskId}`}
          data-id={props.id} className="name" value={props.task.name} onChange={props.onChange}
        />
      </div>
      <div className="form__group task__days">
        <label>Days to complete</label>
        <input type="text" name="days" placeholder="Days to complete" id={`days-${props.taskId}`}
          data-id={props.id} className="days" value={props.task.days} onChange={props.onChange}
        />
      </div>
      <div className="form__group task__cost">
        <label>Cost($)</label>
        <input type="text" name="cost" placeholder="Cost" id={`cost-${props.taskId}`}
          data-id={props.id} className="cost" value={props.task.cost} onChange={props.onChange}
        />
      </div>
      <div className="task__remove" onClick={() => props.onRemove(props.taskId)}>X</div>
    </div>
  );
}

export default AddTaskInput;