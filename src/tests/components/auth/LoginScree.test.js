import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store'; 
import thunk from 'redux-thunk';
import { startGoogleLogin, startLoginWithEmailPassword } from '../../../actions/auth';
import { LoginScree } from '../../../components/auth/LoginScree';

jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginWithEmailPassword: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
}

let store = mockStore(initialState);
store.dispatch = jest.fn()

const wrapper = mount(
    <Provider store={ store }>
        <MemoryRouter>
            <LoginScree />
        </MemoryRouter>
    </Provider>
)

describe('Test on component <LoginScree />', () => {

    beforeEach(() => {
        store = mockStore(initialState);
        jest.clearAllMocks();
    })

    test('should show itself correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })
    
    test('should lauch the action startGoogleLogin', () => {
        wrapper.find('.google-btn').prop('onClick')();

        expect(startGoogleLogin).toHaveBeenCalled()
    })
    
    test('should lauch startLoginWithEmailPassword witht the defaluy values', () => {
        wrapper.find('form').prop('onSubmit')({ preventDefault(){} });
        const values = {
            email: '',
            password: ''
        }
        expect(startLoginWithEmailPassword).toHaveBeenCalledWith(values.email, values.password)
    })
    
})
