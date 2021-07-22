import React from 'react';
import { mount } from "enzyme"
import { Provider } from "react-redux"
import { RegisterScreen } from "../../../components/auth/RegisterScreen"
import configureStore from 'redux-mock-store'; 
import thunk from 'redux-thunk';
import { MemoryRouter } from "react-router-dom";
import { types } from '../../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
    auth: {},
    ui: {
      loading: false,
      msgError: null
    },
    notes: {
      notes: [],
      active: null
    }
}

let store = mockStore(initialState);

const wrapper = mount(
    <Provider store={ store }>
        <MemoryRouter>
            <RegisterScreen />
        </MemoryRouter>
    </Provider>
    )

describe('Test on component <RegisterScreen />', () => {
    
    test('should show itself corectly', () => {
        expect(wrapper).toMatchSnapshot();
    })
    
    test('should dispatch the respective action', () => {
        const emailField = wrapper.find('input[name="email"]');

        emailField.simulate('change', {
            target: {
                value: '',
                name: 'email'
            }
        })

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        })
        const actions = store.getActions();
        // console.log(actions);

        expect(actions[0]).toEqual({
            type: types.uiSetError,
            payload: 'Email is not valid'
        })
    })
    
    test('should show the alert box with the error message', () => {
        const initialState = {
            auth: {},
            ui: {
              loading: false,
              msgError: 'Email is not valid'
            },
            notes: {
              notes: [],
              active: null
            }
        }
        
        const store = mockStore(initialState);
        
        const wrapper = mount(
            <Provider store={ store }>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        )

        expect(wrapper.find('.auth__alert-error').exists()).toBeTruthy();
        expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initialState.ui.msgError);
    })
    
})
