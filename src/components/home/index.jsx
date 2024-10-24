import React from 'react'
import { useAuth } from '../../contexts/authContext'
import TaskManager from '../tasks/TaskManager';

const Home = () => {
    const { currentUser } = useAuth();
    return (
        <div className='content-container'>
          <div className='home-container'>
            <h1 className='welcome-message'>
              Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}!
            </h1>
            <TaskManager />
          </div>
        </div>
      )
}

export default Home;