 /**
 * @jest-environment node
 */
import configureStore from 'redux-mock-store'; 
import thunk from 'redux-thunk'
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebase_config';
import { types } from '../../types/types';
import { fileUpload } from '../../helpers/fileupload';

jest.mock('../../helpers/fileupload', () => ({
    fileUpload: jest.fn(() => {
        return Promise.resolve('https://hello-world/imaagen.png')
        // return 'https://hello-world/imaagen.png'
    })
}))
global.scrollTo = jest.fn(); 

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
    auth: {
        uid: 'Testing'
    },
    notes: {
        active : {
            id: 'Q2p6FIw4fQ1K0TpQPU5w',
            title: 'Hola',
            body: 'Mundo'
        }
    }
}

let store = mockStore(initialState);

describe('Test on action notes', () => {

    beforeEach(() => {
        store = mockStore(initialState)
    })
    
    test('should create a new note - startNewNote', async() => {
        await store.dispatch(startNewNote());

        const actions = store.getActions();
        // console.log(actions);

        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        const docId = actions[0].payload.id
        // console.log(docId);

        await db.doc(`Testing/journal/notes/${ docId }`).delete();
    })
    
    test('startLoadingNotes should load the notes', async() => {
        await store.dispatch(startLoadingNotes('Testing'));

        const actions = store.getActions();
        // console.log(actions[0].payload);
        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        })

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        }
        expect(actions[0].payload[0]).toMatchObject(expected)
    })
    
    test('startSaveNote should update the note', async() => {
        const note = {
            id: 'LHDxefOtOWcvFPPLCNzh',
            title: 'Title',
            body: 'Body'
        }

        await store.dispatch(startSaveNote(note));
        const actions = store.getActions();
        // console.log(actions);
        expect(actions[0].type).toBe(types.notesUpdated);

        const docRef = await db.doc(`/Testing/journal/notes/${note.id}`).get();

        expect(docRef.data().title).toBe(note.title);
    })

    // test('startUploading should update the etry url', async() => {
    //     const file = new File([], 'fdjf.png')

    //     await store.dispatch(startUploading(file))

    //     const docRef = await db.doc(`Testing/journal/notes/${ initialState.notes.active.id }`).get();
        
    //     expect(docRef.data()).toBe('https://hello-world/imaagen.png')
    // })
})
