import React from 'react'
import { NoteAppBar } from './NoteAppBar'

export const NoteScreen = () => {
    return (
        <div className="notes__main-content">
            <NoteAppBar />

            <div className="notes__content">
                <input type="text" placeholder="Some awesome title" className="notes__title-input" />

                <textarea placeholder="Whant happened today?" className="notes_text-area"></textarea>

                <div className="notes__images">
                    <img alt="Upload" src="https://i.pinimg.com/originals/c3/72/2c/c3722cfbfbe16b617bc55c547bb72691.jpg" />
                </div>
            </div>

        </div>
    )
}
