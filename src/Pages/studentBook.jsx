import './studentBook.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, orderBy, query } from 'firebase/firestore';
import { AddBtn, CancleBtn, DelBtn, EditBtn, RecordAdderBtn, RecordEditBtn  } from '../components/Buttons';
import { db } from '../components/firebaseConfig';

//Element to add new student's entries
const AddRecord = (props) =>{

    const grades = [
        'A+', 'A', 'A-', 
        'B+', 'B', 'B-', 
        'C+', 'C', 'C-', 
        'D+', 'D', 'D-', 
        'F'
      ];

    const schoolGrades = [
        '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', 
        '8th', '9th', '10th', '11th', '12th'
      ];

    return(
        <>
        <h3>Add:</h3>
        <form action="submit">
            <input placeholder='name...' onChange={props.onChangeName}  value={props.valueName} type="text" />
            <input type="text" placeholder='gpa...' onChange={props.onChangeGpa} value={props.valueGpa} />
            <select 
                id="standard-select" 
                value={props.valueStandard} 
                onChange={props.onChangeStandard}
            >
                <option value="">Choose a Standard</option>
                {schoolGrades.map((grade, index) => (
                <option key={index} value={grade}>
                    {grade}
                </option>
                ))}
            </select>
            <select 
                id="grade-select" 
                value={props.valueGrade} 
                onChange={props.onChangeGrade}
            >
                <option value="">Choose a grade</option>
                {grades.map((grade, index) => (
                <option key={index} value={grade}>
                    {grade}
                </option>
                ))}
            </select>
            <i id='icon' onClick={props.onClickX} className="bi bi-x"></i>
            <br />
            <RecordAdderBtn onClick={props.onClickAdd}/>
            <CancleBtn onClick={props.onClickCancle} />
            <br /><br />
        </form>
        </>
    )
}

//Element to edit a student's record
const EditRecord = (props) =>{

    const grades = [
        'A+', 'A', 'A-', 
        'B+', 'B', 'B-', 
        'C+', 'C', 'C-', 
        'D+', 'D', 'D-', 
        'F'
      ];

    const schoolGrades = [
        '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', 
        '8th', '9th', '10th', '11th', '12th'
      ];

    return(
        <>
        <h3>Edit:</h3>
        <form action="submit">
            <input placeholder='name...' onChange={props.onChangeName}  value={props.valueName} type="text" />
            <input type="text" placeholder='gpa...' onChange={props.onChangeGpa} value={props.valueGpa} />
            <select 
                id="standard-select" 
                value={props.valueStandard} 
                onChange={props.onChangeStandard}
            >
                <option value="">Choose a Standard</option>
                {schoolGrades.map((grade, index) => (
                <option key={index} value={grade}>
                    {grade}
                </option>
                ))}
            </select>
            <select 
                id="grade-select" 
                value={props.valueGrade} 
                onChange={props.onChangeGrade}
            >
                <option value="">Choose a grade</option>
                {grades.map((grade, index) => (
                <option key={index} value={grade}>
                    {grade}
                </option>
                ))}
            </select>
            <i id='icon' onClick={props.onClickX} className="bi bi-x"></i>
            <br />
            <RecordEditBtn onClick={props.onClickEdit}/>
            <CancleBtn onClick={props.onClickCancle} />
            <br /><br />
        </form>
        </>
    )
}

//Element to show all records
const StudentBook = (props) =>{
    const [studentData, setstudentData] = useState([])
    const [showRecordAdder, setshowRecordAdder] = useState(false)
    const [showRecordEdit, setshowRecordEdit] = useState(false)
    const [newName, setnewName] = useState('')
    const [newGpa, setnewGpa] = useState('')
    const [newStandard, setnewStandard] = useState('')
    const [newGrade, setnewGrade] = useState('')
    const [editable, setEditable] = useState(null);



    //Importing yearly record data
    useEffect(() => {
        const fetchData = async () => {
            const q = query(collection(db, 'yearly record'), orderBy('timestamp', 'asc')); // or 'desc' for newest first
            const querySnapshot = await getDocs(q);
            const documents = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

        setstudentData(documents);
      };
  
      fetchData();
    }, []);

    //SAVE DATA SHORTCUT
    const saveData = async()=>{
        const q = query(collection(db, 'yearly record'), orderBy('timestamp', 'asc')); // or 'desc' for newest first
        const querySnapshot = await getDocs(q);
        const documents = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setstudentData(documents);
    }

    //Adding new entried to the record
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          // Reference to the collection
          const docRef = await addDoc(collection(db, 'yearly record'), {
            name:newName,
            gpa: newGpa,
            standard: newStandard,
            grade: newGrade,
            timestamp: serverTimestamp()
          });
            saveData()
            console.log("Document written with ID: ", docRef.id)
            setnewName('')
            setnewGpa('')
            setnewStandard('')
            setnewGrade('')
            setshowRecordAdder(false)
            
        } 
        
        catch (error) {
          console.error("Error adding document: ", error);
        }
    };

    //Edit Record:
    const handleUpdate = async (a) => {
        a.preventDefault()
        if (!editable) return;
        try {
            
            await updateDoc(doc(db, 'yearly record', editable.id), {
                name:newName,
                gpa: newGpa,
                standard: newStandard,
                grade: newGrade
            });
            setshowRecordEdit(false);
            saveData();
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    //Delete Record:
    const handleDelete = async (id) => {
        try {
          await deleteDoc(doc(db, 'yearly record', id));
          console.log("Document deleted successfully!");
          saveData()
        } catch (error) {
          console.error("Error deleting document: ", error);
        }
      };

    return(
        <div id='studentBookBody'>

            {/*Heading*/}
            <h1 id='sb-heading'>Student Records</h1>

            {/*Add Button*/}
            <div id='addRecord'>
                <AddBtn name='+ Add' onClick={()=>{
                    setshowRecordAdder(true);
                    setshowRecordEdit(false);
                    setnewName('');
                    setnewGpa('');
                    setnewStandard('');
                    setnewGrade('');
                    }} />
            </div>
            <div id='tb-contentTab'></div>

            <br />

            {/*Adding new entry*/}
            {showRecordAdder? 
            <div id='add-entry'>
                <AddRecord
                onChangeName={(a)=>{setnewName(a.target.value)}}
                onChangeGpa={(a)=>setnewGpa(a.target.value)}
                onChangeStandard={(a)=>setnewStandard(a.target.value)}
                onChangeGrade={(a)=>setnewGrade(a.target.value)}
                valueName={newName}
                valueGpa={newGpa}
                valueStandard={newStandard}
                valueGrade={newGrade}
                onClickX={()=>{
                    setnewName('');
                    setnewGpa('');
                    setnewStandard('');
                    setnewGrade('');
                }}
                onClickAdd={handleSubmit}
                onClickCancle={()=>{setshowRecordAdder(false)}}
                />
            </div>:
            null}

            {/*Editing Records*/}
            {showRecordEdit?
            (<div id='edit-entry'>
                <EditRecord
                onChangeName={(a)=>{setnewName(a.target.value)}}
                onChangeGpa={(a)=>setnewGpa(a.target.value)}
                onChangeStandard={(a)=>setnewStandard(a.target.value)}
                onChangeGrade={(a)=>setnewGrade(a.target.value)}
                valueName={newName}
                valueGpa={newGpa}
                valueStandard={newStandard}
                valueGrade={newGrade}
                onClickEdit={handleUpdate}
                onClickX={()=>{
                    setnewName('');
                    setnewGpa('');
                    setnewStandard('');
                    setnewGrade('');
                }}
                
                onClickCancle={()=>{setshowRecordEdit(false)}}
                />
            </div>):
            null}

            {/*Displaying Records*/}
            <div id='sb-contentTab'>
                <table class="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">GPA</th>
                        <th scope="col">Standard</th>
                        <th scope="col">Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentData.map((a,  index) =>
                        {return <tr>
                            <th>{index+1}</th>
                            <td>{a.name}</td>
                            <td>{a.gpa}</td>
                            <td>{a.standard}</td>
                            <td>{a.grade}</td>
                            <td id='record-modify'>
                                <EditBtn
                                onClick={()=>{
                                    setEditable(a);
                                    setshowRecordEdit(true);
                                    setshowRecordAdder(false);
                                    setnewName(a.name);
                                    setnewGpa(a.gpa);
                                    setnewGrade(a.grade);
                                    setnewStandard(a.standard);
                                }}
                                />
                                <DelBtn
                                onClick={()=>{handleDelete(a.id)}}
                                />
                            </td>
                        </tr>})}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

//Element to show records that are filtered by the search
const SearchStudentBook = (props) =>{
    const [studentData, setstudentData] = useState([])
    const [showRecordAdder, setshowRecordAdder] = useState(false)
    const [showRecordEdit, setshowRecordEdit] = useState(false)
    const [newName, setnewName] = useState('')
    const [newGpa, setnewGpa] = useState('')
    const [newStandard, setnewStandard] = useState('')
    const [newGrade, setnewGrade] = useState('')
    const [editable, setEditable] = useState(null);



    //filtering yearly record data
    useEffect(()=>{
        const lowerCaseSearchTerm = props.searchValue.toLowerCase();
        const searchDocuments = async (searchTerm) => {
        const querySnapshot = await getDocs(collection(db, 'yearly record'));
        const matchedDocs = querySnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(doc => 
                Object.values(doc)
                    .some(value => 
                        typeof value === 'string' && value.toLowerCase().includes(lowerCaseSearchTerm)
                    )
            )
            setstudentData(matchedDocs);
            console.log('results: ',matchedDocs);
            
          return matchedDocs}
            searchDocuments()
            
    }, [props.searchValue])

    //SAVE DATA SHORTCUT
    const saveData = async()=>{
        const q = query(collection(db, 'yearly record'), orderBy('timestamp', 'asc')); // or 'desc' for newest first
        const querySnapshot = await getDocs(q);
        const documents = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setstudentData(documents);
    }

    //Edit Record:
    const handleUpdate = async (a) => {
        a.preventDefault()
        if (!editable) return;
        try {
            
            await updateDoc(doc(db, 'yearly record', editable.id), {
                name:newName,
                gpa: newGpa,
                standard: newStandard,
                grade: newGrade
            });
            setshowRecordEdit(false);
            saveData();
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    //Delete Record:
    const handleDelete = async (id) => {
        try {
          await deleteDoc(doc(db, 'yearly record', id));
          console.log("Document deleted successfully!");
          saveData()
        } catch (error) {
          console.error("Error deleting document: ", error);
        }
      };

    return(
        <div id='StudentBookBody'>

            

            <br />

            {/*Editing Records*/}
            {showRecordEdit?
            (<div id='edit-entry'>
                <EditRecord
                onChangeName={(a)=>{setnewName(a.target.value)}}
                onChangeGpa={(a)=>setnewGpa(a.target.value)}
                onChangeStandard={(a)=>setnewStandard(a.target.value)}
                onChangeGrade={(a)=>setnewGrade(a.target.value)}
                valueName={newName}
                valueGpa={newGpa}
                valueStandard={newStandard}
                valueGrade={newGrade}
                onClickEdit={handleUpdate}
                onClickX={()=>{
                    setnewName('');
                    setnewGpa('');
                    setnewStandard('');
                    setnewGrade('');
                }}
                
                onClickCancle={()=>{setshowRecordEdit(false)}}
                />
            </div>):
            null}

            {/*Displaying Records*/}
            <div id='sb-contentTab'>
                <h3 id='sb-searchHeading'>Search Results:</h3>
                <table class="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">GPA</th>
                        <th scope="col">Standard</th>
                        <th scope="col">Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentData.map((a,  index) =>
                        {return <tr>
                            <th>{index+1}</th>
                            <td>{a.name}</td>
                            <td>{a.gpa}</td>
                            <td>{a.standard}</td>
                            <td>{a.grade}</td>
                            <td id='record-modify'>
                                <EditBtn
                                onClick={()=>{
                                    setEditable(a);
                                    setshowRecordEdit(true);
                                    setshowRecordAdder(false);
                                    setnewName(a.name);
                                    setnewGpa(a.gpa);
                                    setnewGrade(a.grade);
                                    setnewStandard(a.standard);
                                }}
                                />
                                <DelBtn
                                onClick={()=>{handleDelete(a.id)}}
                                />
                            </td>
                        </tr>})}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export {StudentBook, SearchStudentBook};