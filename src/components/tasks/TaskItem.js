import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { EditTaskForm } from './EditTaskForm';

export const TaskItem = ({ task, toggleComplete, deleteTask, editTask }) => {
  const { id, task: taskText, completed, priority } = task;

  const priorityLabel = (() => {
    switch (priority) {
      case 'high':
        return 'High Priority';
      case 'medium':
        return 'Medium Priority';
      case 'low':
        return 'Low Priority';
      default:
        return 'No Priority';
    }
  })();

  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="todo">
      {isEditing ?
        <EditTaskForm editTask={editTask} task={task} setIsEditing={setIsEditing} />
        :
        <>
          <p
            onClick={() => toggleComplete(id)}
            className={completed ? 'completed' : 'incompleted'}
          >
            {taskText} - {priorityLabel}
          </p>
          <div>
            <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => setIsEditing(true)} />
            <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => deleteTask(id)} />
          </div>
        </>
      }
    </div>
  );
};



        // <div key={task.id} className={task-card ${task.completed ? 'completed' : ''}}>
        //   <div className="task-details">
        //     <div className="priority-indicator" style={{ backgroundColor: priorityColors[task.priority] }}></div>
        //     <p className="task-text" onClick={() => handleToggleComplete(task.id)}>
        //       {task.task}
        //     </p>
        //     <div className="task-actions">
        //       <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => handleEditTask(task.id)} />
        //       <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => handleDeleteTask(task.id)} />
        //     </div>
        //   </div>
        // </div>