import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { startGoogleLogin, startLoginWithEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScree = () => {

    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.ui)

    const [values, handleInputChange] = useForm({
        email: 'viktorb.132@gmail.com',
        password: 'Hola7u7'
    });

    const {email, password} = values;

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(startLoginWithEmailPassword(email, password))
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }

    return (
        <>
            <h2 className="auth_title">LoginScree</h2>

            <form onSubmit={ handleSubmit } className="animate__animated animate__fadeIn animate__faster" >
                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />
                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={ handleInputChange }
                />
                <button type="submit" className="btn btn-primary btn-block" disabled={ loading }>
                    Login
                </button>

                <div className="auth__socila-networks">
                    <p>Login with social networks</p>
                    <div 
                        className="google-btn"
                        onClick={ handleGoogleLogin }
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link to="/auth/register" className="link">
                    Create new account
                </Link>
            </form>
        </>
    )
}
