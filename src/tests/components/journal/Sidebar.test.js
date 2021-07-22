import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store'; 
import thunk from 'redux-thunk';
import { startLogout } from '../../../actions/auth';
import { Sidebar } from '../../../components/journal/Sidebar';
import { startNewNote } from '../../../actions/notes';

jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn()
}))

jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
    auth: {
        uid: '464',
        name: 'victor'
    },
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

const wrapper = mount(
    <Provider store={ store }>
        <MemoryRouter>
            <Sidebar />
        </MemoryRouter>
    </Provider>
)

describe('Test on component <Sidebar />', () => {
    
    test('should show itslef correctly', () => {
        expect(wrapper).toMatchSnapshot();
    })
    
    test('should call logout', () => {
        wrapper.find('button').simulate('click');
        expect(startLogout).toHaveBeenCalled();
    })
    
    test('should call start newNote', () => {
        wrapper.find('.journal__new-entry').simulate('click');
        expect(startNewNote).toHaveBeenCalled();
    })
    
})
