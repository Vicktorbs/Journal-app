import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes'

export const NoteAppBar = () => {

    const dispatch = useDispatch()
    const { active } = useSelector(state => state.notes)

    const handleSave =  () => {
        dispatch(startSaveNote(active))
    }
    const handlePictureUoload = () => {
        document.querySelector('#fileSelector').click()
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            dispatch(startUploading(file))
        }
    }
    return (
        <div className="notes_appbar">
            <span>25 de Abril 2021</span>

            <input
                id="fileSelector"
                type="file"
                name="file"
                style={{ display: 'none' }}
                onChange={ handleFileChange }
            />

            <div>
                <button className="btn" onClick={ handlePictureUoload }>
                    Picture
                </button>
                <button className="btn" onClick={ handleSave }>
                    Save
                </button>
            </div>
        </div>
    )
}
