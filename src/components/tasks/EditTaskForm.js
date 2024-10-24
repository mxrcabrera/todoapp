import React, { useState } from 'react';

export const EditTaskForm = ({ editTask, task, setIsEditing }) => {
  const [updatedTask, setUpdatedTask] = useState(task.task);
  const [priority, setPriority] = useState(task.priority);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTask({ task: updatedTask, priority, completed: task.completed }, task.id);
    setUpdatedTask('');
    setIsEditing(false)
  };

  return (
    <form className="todoform" onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={updatedTask}
        placeholder="Update Task"
        onChange={(e) => setUpdatedTask(e.target.value)}
      />
      <div className="select-wrapper">
        <select className="select" value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>
      <button type="submit" className="btn" >Update Task</button>
    </form>
  );
};