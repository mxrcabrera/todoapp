import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';
import '../../App.css'

const Header = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    const handleLogout = async () => {
        try {
            await doSignOut();
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <nav className='navbar'>
            <div className='logo-container'>
                <div className='logo'>ToDo App</div>
            </div>
            <ul className='nav-links'>
                {userLoggedIn ? (
                    <li>
                        <button className='btn-nav' onClick={handleLogout}>Logout</button>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link to={'/login'} className='btn-nav'>Login</Link>
                        </li>
                        <li>
                            <Link to={'/register'} className='btn-nav'>Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Header;