import './notes.css'
import { useState, useEffect } from 'react'
import { db } from '../components/firebaseConfig';
import { collection, updateDoc, getDocs, addDoc, deleteDoc, doc, serverTimestamp, orderBy, query } from 'firebase/firestore';
import { AddBtn, NoteAdderBtn, CancleBtn, DelBtn, EditBtn } from '../components/Buttons';
import { toWords } from 'number-to-words';
import 'bootstrap-icons/font/bootstrap-icons.css';

//element to add new note
const NewNoteAdder = (props) => {
    return (
        <div>
            <input id='headerInput' placeholder='header...' type="text" onChange={props.headerChange} value={props.headerValue} />
            <i id='icon' onClick={props.Xbtn} className="bi bi-x"></i>
            <br />
            <textarea id='bodyInput' value={props.noteValue} onChange={props.noteDataChange} placeholder='notes...' rows="4"></textarea>
            <br />
            <NoteAdderBtn onClick={props.addNoteFn} />
            <CancleBtn onClick={props.onClickX} />
        </div>
    )
}

//element to edit existing note
const EditNote = (props) => {
    return (
        <div>
            <input id='headerInput' placeholder='header...' type="text" onChange={props.headerChange} value={props.headerValue} />
            <i id='icon' onClick={props.Xbtn} className="bi bi-x"></i>
            <br />
            <textarea id='bodyInput' value={props.noteValue} onChange={props.noteDataChange} placeholder='notes...' rows="4"></textarea>
            <br />
            <NoteAdderBtn onClick={props.EditNote} />
            <CancleBtn onClick={props.onClickX} />
        </div>
    )
}

//element showing all notes
const Notes = () => {
    const [notesData, setNotesData] = useState([]);
    const [showNotesAdder, setShowNotesAdder] = useState(false);
    const [newNote, setNewNote] = useState('');
    const [newNoteHeader, setNewNoteHeader] = useState('');
    const [showEditTab, setShowEditTab] = useState(false);
    const [editedNote, setEditedNote] = useState('');
    const [editedHeader, setEditedHeader] = useState('');
    const [editable, setEditable] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    // Fetch data from Firestore
    const fetchData = async () => {
        const q = query(collection(db, 'notes'), orderBy('timestamp', 'asc'));
        const querySnapshot = await getDocs(q);
        const documents = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setNotesData(documents);
    };

    // Add a new note
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'notes'), {
                header: newNoteHeader,
                note: newNote,
                timestamp: serverTimestamp()
            });
            setNewNote('');
            setNewNoteHeader('');
            setShowNotesAdder(false);
            fetchData();
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    // Delete a note
    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'notes', id));
            fetchData();
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    // Update an existing note
    const handleUpdate = async () => {
        if (!editable) return;
        try {
            await updateDoc(doc(db, 'notes', editable.id), {
                header: editedHeader,
                note: editedNote,
            });
            setShowEditTab(false);
            fetchData();
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    const capitalizeFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);

    return (
        <div id='notesBody'>
            <h1 id='n-heading'>Notes</h1>
            <div id='addNote'>
                <AddBtn name='+ Add' onClick={() => setShowNotesAdder(true)} />
            </div>

            <div id='n-contentTab'>
                {showNotesAdder && (
                    <NewNoteAdder
                        addNoteFn={handleSubmit}
                        headerChange={(e) => setNewNoteHeader(e.target.value)}
                        onClickX={() => {
                            setShowNotesAdder(false);
                            setNewNote('');
                            setNewNoteHeader('');}}
                        Xbtn={() => {
                            setNewNote('');
                            setNewNoteHeader('');
                        }}
                        noteDataChange={(e) => setNewNote(e.target.value)}
                        noteValue={newNote}
                        headerValue={newNoteHeader}
                    />
                )}

                {showEditTab && editable && (
                    <EditNote
                        noteDataChange={(e) => setEditedNote(e.target.value)}
                        headerChange={(e) => setEditedHeader(e.target.value)}
                        headerValue={editedHeader}
                        noteValue={editedNote}
                        Xbtn={() => {
                            setEditedHeader('')
                            setEditedNote('')}}
                        onClickX={() => setShowEditTab(false)}
                        EditNote={handleUpdate}
                    />
                )}

                <div className="accordion" id="accordion">
                    {notesData.map((note, index) => {
                        const uniqueId = "collapse" + capitalizeFirstLetter(toWords(index + 1));
                        return (
                            <div key={note.id} className="accordion-item">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#${uniqueId}`}
                                        aria-expanded="true"
                                        aria-controls={uniqueId}
                                    >
                                        {index + 1}. {note.header}
                                    </button>
                                </h2>
                                <div id={uniqueId} className="accordion-collapse collapse" data-bs-parent="#accordion">
                                    <div id='noteContent' className="accordion-body">
                                        <span id='noteContent'>{note.note}</span>
                                        
                                        <br />
                                        <br />
                                        <br /><br />
                                        <hr />
                                        <span id='contentBtns'>
                                            <DelBtn id='contentBtns' onClick={() => handleDelete(note.id)} />
                                            <EditBtn id='contentBtns' onClick={() => {
                                                setShowEditTab(true);
                                                setEditable(note);
                                                setEditedHeader(note.header);
                                                setEditedNote(note.note);
                                        }} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

//element to show notes that are filtered by search
const SearchNotes = (props) => {
    const [notesData, setNotesData] = useState([]);
    const [showNotesAdder, setShowNotesAdder] = useState(false);
    const [newNote, setNewNote] = useState('');
    const [newNoteHeader, setNewNoteHeader] = useState('');
    const [showEditTab, setShowEditTab] = useState(false);
    const [editedNote, setEditedNote] = useState('');
    const [editedHeader, setEditedHeader] = useState('');
    const [editable, setEditable] = useState(null);

    //Filtering Notes
    useEffect(()=>{
        const lowerCaseSearchTerm = props.searchValue.toLowerCase();
        const searchDocuments = async () => {
        const querySnapshot = await getDocs(collection(db, 'notes'));
        const matchedDocs = querySnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(doc => 
                Object.values(doc)
                    .some(value => 
                        typeof value === 'string' && value.toLowerCase().includes(lowerCaseSearchTerm)
                    )
            )
            setNotesData(matchedDocs);
            console.log('results: ',matchedDocs);
            
          return matchedDocs}
            searchDocuments()
            
    }, [props.searchValue])

 

    // Delete a note
    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'notes', id));
            fetchData();
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    // Update an existing note
    const handleUpdate = async () => {
        if (!editable) return;
        try {
            await updateDoc(doc(db, 'notes', editable.id), {
                header: editedHeader,
                note: editedNote,
            });
            setShowEditTab(false);
            fetchData();
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    const capitalizeFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);

    return (
            <div id='n-contentTab'>
                <h3>Search Result:</h3>

                {showEditTab && editable && (
                    <EditNote
                        noteDataChange={(e) => setEditedNote(e.target.value)}
                        headerChange={(e) => setEditedHeader(e.target.value)}
                        headerValue={editedHeader}
                        noteValue={editedNote}
                        Xbtn={() => {
                            setEditedHeader('')
                            setEditedNote('')}}
                        onClickX={() => setShowEditTab(false)}
                        EditNote={handleUpdate}
                    />
                )}

                <div className="accordion" id="accordion">
                    {notesData.map((note, index) => {
                        const uniqueId = "collapse" + capitalizeFirstLetter(toWords(index + 1));
                        return (
                            <div key={note.id} className="accordion-item">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#${uniqueId}`}
                                        aria-expanded="true"
                                        aria-controls={uniqueId}
                                    >
                                        {index + 1}. {note.header}
                                    </button>
                                </h2>
                                <div id={uniqueId} className="accordion-collapse collapse" data-bs-parent="#accordion">
                                    <div id='noteContent' className="accordion-body">
                                        <span id='noteContent'>{note.note}</span>
                                        
                                        <br />
                                        <br />
                                        <br /><br />
                                        <hr />
                                        <span id='contentBtns'>
                                            <DelBtn id='contentBtns' onClick={() => handleDelete(note.id)} />
                                            <EditBtn id='contentBtns' onClick={() => {
                                                setShowEditTab(true);
                                                setEditable(note);
                                                setEditedHeader(note.header);
                                                setEditedNote(note.note);
                                        }} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
    )
}

export { Notes, SearchNotes }
