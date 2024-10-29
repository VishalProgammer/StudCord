import './tasks.css'
import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp, orderBy, query } from 'firebase/firestore';
import { db } from '../components/firebaseConfig'
import { AddBtn } from '../components/Buttons';
import 'bootstrap-icons/font/bootstrap-icons.css';


const AddTask = (props) =>{
    return(
        <>
        <form action="submit">
            <input onChange={props.onChange}  value={props.value} type="text" />
            <AddBtn onClick={props.onClick} name='Add task'/>
            <i id='icon' onClick={props.onClickX} class="bi bi-x"></i>
        </form>
        </>
    )
}

const Tasks =  (props)=>{
    const [taskData, settaskData] = useState([])
    const [showTaskAdder, setshowTaskAdder] = useState(false)
    const [newTask, setnewTask] = useState('')

        useEffect(() => {
            const fetchData = async () => {
                const q = query(collection(db, 'tasks'), orderBy('timestamp', 'asc')); // or 'desc' for newest first
                const querySnapshot = await getDocs(q);
                const documents = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

            settaskData(documents);
          };
      
          fetchData();
        }, [db]);

        //SAVE DATA SHORTCUT
        const saveData = async()=>{
            const q = query(collection(db, 'tasks'), orderBy('timestamp', 'asc')); // or 'desc' for newest first
            const querySnapshot = await getDocs(q);
            const documents = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));

              settaskData(documents);
        }

//Add more task:
const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Reference to the collection
      const docRef = await addDoc(collection(db, 'tasks'), {
        task:newTask,
        timestamp: serverTimestamp()
      });
      
      console.log("Document written with ID: ", docRef.id);
      setnewTask('');
      setshowTaskAdder(false);
      saveData()
    } 
    
    catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const addBtn = () =>{
    setshowTaskAdder(true)
  }

  const handleClose = () =>{
    setshowTaskAdder(false)
  }


  //Delete Function:
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
      console.log("Document deleted successfully!");
      saveData()
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  //Rendering all Elements:
    return(
        <div id='tasksBody'>
            <h1 id='tb-heading'>Tasks list</h1>
            <div id='addTask'>
                <AddBtn name='+ Add' onClick={addBtn} /></div>
            <div id='tb-contentTab'>
               {showTaskAdder?
                <AddTask onClickX={handleClose} value={newTask} onChange={(a)=>setnewTask(a.target.value)} onClick={handleSubmit} />:
                null}
                <p>debug input: {newTask}</p>
                {taskData.map((a, index) =>{
                    return(
                    <>
                        <p className='task'>
                            {index + 1}. {a.task}
                                <i onClick={() => handleDelete(a.id)} id='complete' class='bi bi-check2-square'></i> 
                                <i onClick={() => handleDelete(a.id)} id='cancle' class='bi bi-x'></i>
                        </p>
                    </>)
                })}
            </div>
        </div>
    )
}



export {Tasks}