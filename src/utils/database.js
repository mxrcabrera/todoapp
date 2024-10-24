import { ref, set, update, remove, onValue } from 'firebase/database';
import { db } from '../firebase/firebase';

// Function to add a task to the database with user UID
export function addTaskToDatabase(task, uid, taskID) {
  return set(ref(db, `tasks/${uid}/${taskID}`), task); // Use user UID in the reference
}

// Function to fetch tasks for a specific user
export function fetchTasks(uid, setToDos) {
  const tasksRef = ref(db, `tasks/${uid}`); // Use user UID in the reference

  onValue(tasksRef, (snapshot) => {
    const tasks = [];
    snapshot.forEach((childSnapshot) => {
      tasks.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });
    if (typeof setToDos === 'function') {
      setToDos(tasks);
    } else {
      console.error('setToDos is not a function or is not provided correctly');
    }
  });
}

// Function to update a task in the database with user UID
export function updateTaskInDatabase(uid, taskID, updatedTask) {
  console.log("-----!!")
  console.log(uid)
  console.log(taskID)
  console.log(updatedTask)
  const taskRef = ref(db, `tasks/${uid}/${taskID}`); // Use user UID in the reference
  return update(taskRef, updatedTask);
}

// Function to delete a task from the database with user UID
export function deleteTaskFromDatabase(uid, taskID) {
  return remove(ref(db, `tasks/${uid}/${taskID}`)); // Use user UID in the reference
}