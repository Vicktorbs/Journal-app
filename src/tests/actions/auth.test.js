import configureStore from 'redux-mock-store'; 
import thunk from 'redux-thunk';

import { login, logout, startLoginWithEmailPassword, startLogout } from "../../actions/auth"
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {}

let store = mockStore(initialState);

describe('Test on action auth', () => {

    beforeEach(() => {
        store = mockStore(initialState);
    })
    
    test('Login and logout should creat the respective action', () => {
        const loginAction = login('idjlkmcknsdicnE', 'victor');
        const logoutAction = logout();

        expect(loginAction).toEqual({
            type: types.login,
            payload: {
                uid: 'idjlkmcknsdicnE',
                displayName: 'victor'
            }
        })

        expect(logoutAction).toEqual({
            type: types.logout
        })
    })
    
    test('should do startLogout', async() => {
        await store.dispatch(startLogout());

        const actions = store.getActions();

        // console.log(actions);
        expect(actions[0]).toEqual({
            type: types.logout
        })
        expect(actions[1]).toEqual({
            type: types.notesLogoutCleaning
        })
    })
    
    test('should start startRegisterWithEmailPasswordName', async() => {
        await store.dispatch(startLoginWithEmailPassword('brendtest@test.com', '987654'));

        const actions = store.getActions();

        // console.log(actions);
        expect(actions[1]).toEqual({
            type: types.login,
            payload: { 
                uid: 'cikr043phHNIFJgA4DTjGQGzLYq2', 
                displayName: null 
            }
          })
    })
    
})
