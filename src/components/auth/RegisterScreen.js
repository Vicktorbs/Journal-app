import React from 'react';
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {
    
    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui);

    const [values, handleInputChange] = useForm({
        name: 'Brenda',
        email: 'yoana@gmail.com',
        password: '123456',
        passwordConfirm: '123456'
    });

    const { name, email, password, passwordConfirm } = values;

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name, email, password, passwordConfirm);
        if (isFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name))
        }
    }

    const isFormValid = () => {
        
        if (name.trim().length === 0) {
            dispatch(setError('Name required'));
            // console.log('Name required');
            return false
        } else if (!validator.isEmail(email)) {
            dispatch(setError('Email is not valid'));
            // console.log('Email is not valid');
            return false
        } else if (password !== passwordConfirm || password.length < 5) {
            dispatch(setError('Password shold have at least 5 characters and be eaquals'));
            // console.log('Password shold have at least 5 characters and be eaquals');
            return false
        }

        dispatch(removeError());

        return true
    }

    return (
        <>
            <h2 className="auth_title">Register</h2>

            <form onSubmit={ handleSubmit } className="animate__animated animate__fadeIn animate__faster" >
                {
                    msgError && (
                    <div className="auth__alert-error">
                        {msgError}
                    </div>
                    )
                }
                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={ name }
                    onChange={ handleInputChange }
                />
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
                <input 
                    type="password"
                    placeholder="Confirm password"
                    name="passwordConfirm"
                    className="auth__input"
                    value={ passwordConfirm }
                    onChange={ handleInputChange }
                />
                <button type="submit" className="btn btn-primary btn-block mb-5">
                    Register
                </button>

                <Link to="/auth/login" className="link">
                    Already registered?
                </Link>
            </form>
        </>
    )
}
