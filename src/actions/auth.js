import { firebase, googleAuthProvider } from "../firebase/firebase_config";
import { types } from "../types/types"
import { finishLoading, startLoading } from "./ui";
import Swal from 'sweetalert2'
import { noteLogout } from "./notes";

export const startLoginWithEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading());
        firebase.auth().signInWithEmailAndPassword(email, password).then(({ user }) => {
            dispatch(login(user.uid, user.displayName))
            dispatch(finishLoading());
        }).catch(e => {
            // console.log(e);
            dispatch(finishLoading());
            Swal.fire('Error', e.message, 'error');
        })
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(async({ user }) => {
            await user.updateProfile({
                displayName: name
            })
            console.log(user);
            dispatch(login(user.uid, user.displayName))
        }).catch(e => {
            Swal.fire('Error', e.message, 'error');
            // console.log(e);
        })
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

export const startLogout = () => {
    return async(dispatch) => {
        await firebase.auth().signOut();
        dispatch(logout())
        dispatch(noteLogout())
    }
}

export const logout = () => ({
    type: types.logout
})