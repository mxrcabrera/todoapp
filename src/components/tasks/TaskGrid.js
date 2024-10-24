import React from 'react';
import { TaskItem } from './TaskItem';
import { updateTaskInDatabase, deleteTaskFromDatabase } from '../../utils/database';


const TaskGrid = ({ user, tasks, setTasks }) => {
  const toggleComplete = async (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    try {
      await updateTaskInDatabase(user.uid, id, { completed: !tasks.find(task => task.id === id).completed });
      setTasks(updatedTasks);
      console.log("Task updated:", updatedTasks.find(task => task.id === id));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteTaskFromDatabase(user.uid, id);
      setTasks(tasks.filter(task => task.id !== id));
      console.log("Task deleted:", id);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const editTask = async (updatedTask, id) => {   
    const updatedTasks = tasks.map(task =>
      task.id === id ? updatedTask : task
    );
    try {
      await updateTaskInDatabase(user.uid, id, updatedTask);
      console.log("Task edited:", updatedTask);
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const handleToggleComplete = (id) => {
    toggleComplete(id);
  };

  const handleDeleteTask = (id) => {
    deleteTask(id);
  };

  // const handleEditTask = (id) => {
  //   editTask({ isEditing: true }, id);
  // };

  return (
    <div className="task-grid">
      {tasks.map((task) => (
        <TaskItem task={task} toggleComplete={handleToggleComplete} deleteTask={handleDeleteTask} editTask={editTask}  />
      ))}
    </div>
  );
};

export default TaskGrid;