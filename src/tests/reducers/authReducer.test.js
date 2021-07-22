import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe('Tests on reducer authReducer', () => {
    
    const user = {
        uid: 'bjjcoamxnzbappwosic',
        name: 'victor'
    };

    test('should return the default state', () => {
        const state = authReducer(user, {
            type: 'wdnjsfnsdf'
        });
        expect(state).toEqual(user);
    })
    
    test('should login an user', () => {
        const state = authReducer({}, {
            type: types.login,
            payload: {
                uid: 'bjjcoamxnzbappwosic',
                displayName: 'victor'
            }
        });
        expect(state).toEqual(user)
    })
    
    test('should return a logout user', () => {
        const state = authReducer(user, {
            type: types.logout
        });
        expect(state).toEqual({})
    })
    
})
