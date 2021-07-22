import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store'; 
import thunk from 'redux-thunk';
import { login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';
import { act } from 'react-dom/test-utils';
import { firebase } from '../../firebase/firebase_config'
import Swal from 'sweetalert2';

jest.mock('../../actions/auth', () => ({
    login: jest.fn()
}))

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: 'abc'
        },
        notes: []
    }
}

let store = mockStore(initialState);
store.dispatch = jest.fn()

describe('Tests on file AppRouter', () => {
    
    test('should call login if its authenticated', async() => {

        let user;
        await act(async() => {
            const userCredentials = await firebase.auth().signInWithEmailAndPassword('brendtest@test.com', '987456');
            
            user = userCredentials.user
            const wrapper = mount(
                <Provider store={ store }>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            )
        })

        expect(login).toHaveBeenCalled()
        expect(login).toHaveBeenCalledWith('tyNqqGsqs3aTeTmniJvYXULDppU2', null)
    })
    
})
