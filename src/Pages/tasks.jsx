import './tasks.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from 'react';
import { collection,getDoc , getDocs, addDoc,setDoc, deleteDoc, doc, serverTimestamp, orderBy, query } from 'firebase/firestore';
import { AddBtn, TaskAdderBtn  } from '../components/Buttons';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { db } from '../components/firebaseConfig';

const AddTask = (props) =>{
    return(
        <>
        <form action="submit">
            <input onChange={props.onChange}  value={props.value} type="text" />
            <TaskAdderBtn onClick={props.onClick}/>
            <i id='icon' onClick={props.onClickX} className="bi bi-x"></i>
        </form>
        </>
    )
}


//Search Tasks:
const SearchTasks =  (props)=>{
  const [taskData, settaskData] = useState([])
  const [doneTaskData, setdoneTaskData] = useState([])
  const [showTaskAdder, setshowTaskAdder] = useState(false)
  const [newTask, setnewTask] = useState('')

  //filter tasks for search
  useEffect(()=>{
    const lowerCaseSearchTerm = props.searchValue.toLowerCase();
    const searchDocuments = async (searchTerm) => {
    const querySnapshot = await getDocs(collection(db, 'tasks'));
    const matchedDocs = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(doc => 
            Object.values(doc)
                .some(value => 
                    typeof value === 'string' && value.toLowerCase().includes(lowerCaseSearchTerm)
                )
        )
        settaskData(matchedDocs);
        console.log('results: ',matchedDocs);
        
      return matchedDocs}
        searchDocuments()
        
}, [props.searchValue])  
  

    //importing data of completed tasks
    useEffect(() => {
      const fetchData = async () => {
          const q = query(collection(db, 'tasks-done'), orderBy('timestamp', 'asc')); // or 'desc' for newest first
          const querySnapshot = await getDocs(q);
          const documents = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
          }));

      setdoneTaskData(documents);
    };

    fetchData();
  }, []);

  

    //SAVE DATA SHORTCUT
    const saveData = async()=>{
      getDocs(collection(db, 'tasks')).then(querySnapshot =>
        settaskData(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      );}
    const saveDoneData = async()=>{
      getDocs(collection(db, 'tasks-done')).then(querySnapshot =>
        setdoneTaskData(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      );}


    //Movinv completed tasks to saparate collection
    const moveDocument = async (docId) => {
        try {
            const docRef = doc(db, 'tasks', docId);
            const docSnapshot = await getDoc(docRef);

            if (docSnapshot.exists()) {
                const docData = docSnapshot.data(); // Get the document's data

                await setDoc(doc(db, 'tasks-done', docId), docData);

                await deleteDoc(docRef);

                console.log(`Document moved from ${'tasks'} to ${'tasks-done'}`);
            } else {
                console.log("No such document in source collection!");
            }
        } catch (error) {
            console.error("Error moving document: ", error);
        }
    };


      const addBtn = () =>{
        setshowTaskAdder(true)
      }

      const handleClose = () =>{
        setshowTaskAdder(false)
        setnewTask('')
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

  //Completing Tasking:
  const handleDoneTask = (id) =>{
    moveDocument(id).then(()=>{
    saveDoneData()}).then(()=>{
    deleteDoc(doc(db, 'tasks', id))
    saveData()})
  }

  //Delete Function:
  const handleDeleteDoneTask = async (id) => {
    try {
      await deleteDoc(doc(db, 'tasks-done', id));
      console.log("Document deleted successfully!");
      saveDoneData()
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  //Rendering all Elements:
    return(
        <div id='tasksBody'>
            

            <div id='tb-contentTab'>
              <h3>Result Results:</h3>
                {taskData.map((a, index) =>{
                    return(
                    <div className='task'>
                        <p>
                            {index + 2}. {a.task}
                        </p>
                        <i onClick={() => handleDoneTask(a.id)} id='complete' class='bi bi-check2-square'></i> 
                        <i onClick={() => handleDelete(a.id)} id='cancle' class='bi bi-x'></i>
                    </div>)
                })}

                <br /><br /><br />
                <hr />
                <div id='complete-tasks-in-search' >
                <h4>Completed Tasks:</h4> 
                {doneTaskData.map((a, index) =>{
                    return(
                    <div className='task'>
                        <p id='done-tasks'>
                            {index + 1}. {a.task}
                        </p>
                        <i onClick={() => handleDeleteDoneTask(a.id)} id='del-complete' class='bi bi-trash3'></i>
                        <i id='done' class='bi bi-check2-all'></i>
                    </div>)
                })}
                </div>
            </div>
        </div>
    )
}

const Tasks =  (props)=>{
  const [taskData, settaskData] = useState([])
  const [doneTaskData, setdoneTaskData] = useState([])
  const [showTaskAdder, setshowTaskAdder] = useState(false)
  const [newTask, setnewTask] = useState('')

    //importing data
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
        }, []);

    //importing data of completed tasks
    useEffect(() => {
      const fetchData = async () => {
          const q = query(collection(db, 'tasks-done'), orderBy('timestamp', 'asc')); // or 'desc' for newest first
          const querySnapshot = await getDocs(q);
          const documents = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
          }));

      setdoneTaskData(documents);
    };

    fetchData();
  }, []);

  

    //SAVE DATA SHORTCUT
    const saveData = async()=>{
      getDocs(collection(db, 'tasks')).then(querySnapshot =>
        settaskData(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      );}
    const saveDoneData = async()=>{
      getDocs(collection(db, 'tasks-done')).then(querySnapshot =>
        setdoneTaskData(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      );}


    //Movinv completed tasks to saparate collection
    const moveDocument = async (docId) => {
        try {
            const docRef = doc(db, 'tasks', docId);
            const docSnapshot = await getDoc(docRef);

            if (docSnapshot.exists()) {
                const docData = docSnapshot.data(); // Get the document's data

                await setDoc(doc(db, 'tasks-done', docId), docData);

                await deleteDoc(docRef);

                console.log(`Document moved from ${'tasks'} to ${'tasks-done'}`);
            } else {
                console.log("No such document in source collection!");
            }
        } catch (error) {
            console.error("Error moving document: ", error);
        }
    };
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
        setnewTask('')
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

  //Completing Tasking:
  const handleDoneTask = (id) =>{
    moveDocument(id).then(()=>{
    saveDoneData()}).then(()=>{
    deleteDoc(doc(db, 'tasks', id))
    saveData()})
  }

  //Delete Function:
  const handleDeleteDoneTask = async (id) => {
    try {
      await deleteDoc(doc(db, 'tasks-done', id));
      console.log("Document deleted successfully!");
      saveDoneData()
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
               {showTaskAdder?(
                <AddTask 
                onClickX={handleClose} 
                value={newTask} 
                onChange={(a)=>setnewTask(a.target.value)} onClick={handleSubmit} />):
                null}

                <div className='task'>
                  <p >1. Subscribe to IchiHanaBoy :D <i id='pin' class='bi bi-pin-angle'></i> </p>
                  <i onClick={() => 
                    window.alert('[ This is Pinned by Admin! ]\nTHANKSS for Subscribing to me :3 ! \n (I hope you really subscribled and did not just press it for fun!!)')} 
                    id='complete' 
                    class='bi bi-check2-square'></i>
                  <i onClick={() => 
                    window.alert('[ This is Pinned by Admin! ]\nWhy would you try to remove it! ;-; \n (I worked hard, let me advertise a bit pls!!)')} 
                    id='cancle' 
                    class='bi bi-x'></i>
                </div>
                {taskData.map((a, index) =>{
                    return(
                    <div className='task'>
                        <p>
                            {index + 2}. {a.task}
                        </p>
                        <i onClick={() => handleDoneTask(a.id)} id='complete' class='bi bi-check2-square'></i> 
                        <i onClick={() => handleDelete(a.id)} id='cancle' class='bi bi-x'></i>
                    </div>)
                })}

                <br /><br /><br />
                <hr />

                <h4>Completed Tasks:</h4> 
                {doneTaskData.map((a, index) =>{
                    return(
                    <div className='task'>
                        <p id='done-tasks'>
                            {index + 1}. {a.task}
                        </p>
                        <i onClick={() => handleDeleteDoneTask(a.id)} id='del-complete' class='bi bi-trash3'></i>
                        <i id='done' class='bi bi-check2-all'></i>
                    </div>)
                })}
                
            </div>
        </div>
    )
}



export {Tasks, SearchTasks}