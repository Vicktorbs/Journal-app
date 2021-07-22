import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; 
import thunk from 'redux-thunk';
import { activeNote } from '../../../actions/notes';
import { NoteScreen } from '../../../components/notes/NoteScreen';


jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn()
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
            id: 1234,
            title: 'hola',
            body: 'mundo',
            date: 0
        },
        notes: []
    }
}

let store = mockStore(initialState);
store.dispatch = jest.fn()

const wrapper = mount(
    <Provider store={ store }>
        <NoteScreen />
    </Provider>
)

describe('Test on comoponent <NoteScreen />', () => {
    
    test('should show itselft correctly', () => {
        expect(wrapper).toMatchSnapshot();
    })
    
    test('should lauch activeNote', () => {
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hello again'
            }
        })

        expect(activeNote).toHaveBeenCalled();
        expect(activeNote).toHaveBeenCalledWith(
            1234,
            {
                body: 'mundo',
                title: 'Hello again',
                id: 1234,
                date: 0
            }
        );
    })
    
})
