import { types } from "../../types/types"

describe('Comparing types object', () => {

    test('should be the same object', () => {
        const obj = {
            login: '[Auth] Login',
            logout: '[Auth] Logout',

            uiSetError: '[UI] Set Error',
            uiRemoveError: '[UI] Remove Error',

            uiStartLoading: '[UI] Start loading',
            uiFinishLoading: '[UI] Finish loading',

            notesAddNew: '[Notes] New Note',
            notesActive: '[Notes] Set Active Note',
            notesLoad: '[Notes] Load Note',
            notesUpdated: '[Notes] Updated Notes',
            notesFileUrl: '[Notes] Updated imagen url',
            notesDelete: '[Notes] Delete Note',
            notesLogoutCleaning: '[Notes] Logout Cleaning',
        }

        expect(types).toEqual(obj)
    })

})