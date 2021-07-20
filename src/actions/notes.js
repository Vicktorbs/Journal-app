import Swal from "sweetalert2";
import { db } from "../firebase/firebase_config";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () => {
    return async(dispatch, getState) => {
        const uid = getState().auth.uid;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const documentRef = await db.collection(`${ uid }/journal/notes`).add(newNote);
        // console.log(documentRef);
        dispatch(activeNote(documentRef.id, newNote));
        // funcionalidad personalizada, checar
        dispatch(startLoadingNotes(uid));
    }
}

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const startLoadingNotes = (uid) => {
    return async(dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes))
    }
}

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
})

export const startSaveNote = (note) => {
    return async(dispatch, getState) => {
        const uid = getState().auth.uid;

        if (!note.url) {
            delete note.url
        }

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        await db.doc(`${ uid }/journal/notes/${ note.id }`).update(noteToFirestore);

        dispatch(refresNote(note.id, noteToFirestore));
        Swal.fire('Save', note.title, 'success')
    }
}

export const refresNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
})