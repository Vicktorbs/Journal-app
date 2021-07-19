import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { firebase } from '../firebase/firebase_config'
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {
    
    const [checking, setChecking] = useState(true);
    const [isLogedIn, setIsLogedIn] = useState(false)

    const dispatch = useDispatch();
    useEffect(() => {
        firebase.auth().onAuthStateChanged(async(user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLogedIn(true);

                dispatch(startLoadingNotes(user.uid));
            } else {
                setIsLogedIn(false)
            }
            setChecking(false)
        })
    }, [dispatch, setChecking], setIsLogedIn)

    if (checking) {
        return (
            <h1>Wait, checking...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute path="/auth" component={ AuthRouter } isNotAuthenticated={ isLogedIn } />
                    <PrivateRoute exact path="/" component={ JournalScreen } isAuthenticated= { isLogedIn } />
                    {/* <Route path="/auth" component={ AuthRouter } />
                    <Route exact path="/" component={ JournalScreen } /> */}
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router> 
    )
}
