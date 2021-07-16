import { firebase, googleAuthProvider } from "../firebase/firebase_config";
import { types } from "../types/types"

export const startLoginWithEmailPassword = (email, password) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(login(12345, 'Juan'))
        }, 3500);
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider).then(({ user }) => {
            dispatch(login(user.uid, user.displayName))
        })
    }
}

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}