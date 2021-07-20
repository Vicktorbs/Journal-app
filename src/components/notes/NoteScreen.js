import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NoteAppBar } from './NoteAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch()

    const { active:note } = useSelector(state => state.notes);
    const [formValues, handleInputChange, reset] = useForm(note);
    const {body, title} = formValues;

    const activeID = useRef(note.id);

    useEffect(() => {
        // Alerta de ciclo infinito
        if (note.id !== activeID.current) {
            reset(note)
            activeID.current = note.id
        }
    }, [note, reset]);

    useEffect(() => {
        dispatch(activeNote(formValues.id, { ...formValues }))
    }, [formValues, dispatch])

    return (
        <div className="notes__main-content">
            <NoteAppBar />

            <div className="notes__content">
                <input 
                    type="text" 
                    placeholder="Some awesome title" 
                    className="notes__title-input" 
                    name='title'
                    value={ title }
                    onChange={ handleInputChange }
                />

                <textarea 
                    placeholder="Whant happened today?" 
                    className="notes_text-area"
                    name="body"
                    value={ body }
                    onChange={ handleInputChange }
                ></textarea>
                {
                    (note.url) && 
                    (<div className="notes__images">
                        <img alt="Upload" src="https://i.pinimg.com/originals/c3/72/2c/c3722cfbfbe16b617bc55c547bb72691.jpg" />
                    </div>)
                }
            </div>

        </div>
    )
}
