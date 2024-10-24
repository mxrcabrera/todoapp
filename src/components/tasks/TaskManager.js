import React, { useState, useEffect } from 'react';
import { TaskForm } from './TaskForm';
import TaskGrid from './TaskGrid';
import { v4 as uuidv4 } from 'uuid';
import { addTaskToDatabase, fetchTasks, updateTaskInDatabase, deleteTaskFromDatabase } from '../../utils/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../../firebase/firebase';


const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      if (user) {
        try {
          await fetchTasks(user.uid, setTasks);
        } catch (error) {
          console.error("Error loading tasks: ", error);
        }
      }
    };

    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        loadTasks();
      } else {
        setTasks([]);
      }
    });
  }, [user]);

  const addTask = async (taskData) => {
    const { task, priority } = taskData;
    const taskID = uuidv4();
    const newTask = { id: taskID, task, priority, completed: false, uid: user.uid };
    try {
      await addTaskToDatabase(newTask, user.uid, taskID);
      setTasks([...tasks, newTask]);
      console.log("Task added:", newTask);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Function to sort tasks by priority
  const sortTasksByPriority = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const priorityOrder = {
        high: 3,
        medium: 2,
        low: 1,
      };
      return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
    });
    setTasks(sortedTasks);
  };

  return (
    <div className="container">
      <div>
        <h1>Get Things Done!</h1>
        <TaskForm addTask={addTask} />
      </div>
      <div>
        <h2>These are your current tasks:</h2>
        <TaskGrid user={user} tasks={tasks} setTasks={setTasks} />
        <button className="btn" onClick={sortTasksByPriority}>Sort by Priority</button>
      </div>
    </div>
  );
};

export default TaskManager;