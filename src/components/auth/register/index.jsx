import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';
import '../../../App.css'; // Importa los estilos globales

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { userLoggedIn } = useAuth();

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isRegistering) {
            setIsRegistering(true);
            try {
                await doCreateUserWithEmailAndPassword(email, password);
            } catch (error) {
                console.error('Error registering user:', error.message);
                setErrorMessage('Failed to register. Please try again.');
            } finally {
                setIsRegistering(false);
            }
        }
    };

    // Si el usuario ya está logueado, redirige a la página de inicio
    if (userLoggedIn) {
        return <Navigate to="/home" replace={true} />;
    }

    return (
            <div className="content-container">
                <div className="container">
                    <h1>Create a New Account</h1>
                    <form onSubmit={onSubmit} className="todoform">
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input"
                            />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input
                                type="password"
                                autoComplete="new-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input"
                            />
                        </div>
                        <div className="input-container">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                autoComplete="off"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="input"
                            />
                        </div>
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`btn ${isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        <div className="text-center mt-4">
                            Already have an account?{' '}
                            <Link to="/login" className="btn-signup">
                                {/* modificar estilo de este botón */}
                                Sign In
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
    );
};

export default Register;
