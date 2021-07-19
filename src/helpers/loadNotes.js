import { db } from "../firebase/firebase_config"

export const loadNotes = async(uid) => {
    const noteSnap = await db.collection(`${ uid }/journal/notes`).get();
    const notes = []

    noteSnap.forEach(snapSon => {
        // console.log(snapSon.data());
        notes.push({
            id: snapSon.id,
            ...snapSon.data()
        })
    })
    
    return notes
}