import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; 
import thunk from 'redux-thunk';
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {}

let store = mockStore(initialState);
store.dispatch = jest.fn()

const note = { 
    id: 10,
    date: 0,
    title: 'Hola note',
    body: 'Mundo note', 
    url: 'htttps://somewhere.com/foto.jpg'
}

const wrapper = mount(
    <Provider store={ store }>
        <JournalEntry { ...note } />
    </Provider>
)

describe('Test on component <JournalEntry />', () => {
    
    test('should show itself correctly', () => {
        expect(wrapper).toMatchSnapshot();
    })
    
    test('should active the note', () => {
        wrapper.find('.journal__entry').prop('onClick')();
        expect(store.dispatch).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(activeNote(note.id, { ...note }));
    })
    
})
