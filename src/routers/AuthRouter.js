import React from 'react';
import {
    Redirect,
    Route,
    Switch
} from "react-router-dom";
import { LoginScree } from '../components/auth/LoginScree';
import { RegisterScreen } from '../components/auth/RegisterScreen';

export const AuthRouter = () => {
    return (
        <div className="auth__main">
            <div className="auth__box-container">
                <Switch>
                    <Route path="/auth/login" component={ LoginScree } />
                    <Route path="/auth/register" component={ RegisterScreen } />
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </div>
    )
}
