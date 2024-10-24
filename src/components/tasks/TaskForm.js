import React, { useState } from 'react';

export const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('low');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === '') return;

    addTask({ task, priority });
    setTask('');
  };

  return (
    <form className="todoform" onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={task}
        placeholder="What is the task today?"
        onChange={(e) => setTask(e.target.value)}
      />
      <div className="select-wrapper">
        <select className="select" value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>
      <button type="submit" className="btn">Add Task</button>
    </form>
  );
};