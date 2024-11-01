import { useState } from 'react'
import './App.css'
import NavBar from './components/nav-bar'
import { Home } from './Pages/homePage'
import { Tasks, SearchTasks } from './Pages/tasks'
import { SearchStudentBook, StudentBook } from './Pages/studentBook'
import { Notes, SearchNotes } from './Pages/notes'


function App() {
  const [showHomePage, setshowHomePage] = useState(true);
  const [showTasks, setshowTasks] = useState(false);
  const [showTaskSearch, setshowTaskSearch] = useState(false);
  const [showStudentBook, setshowStudentBook] = useState(false);
  const [showStudentBookSearch, setshowStudentBookSearch] = useState(false);
  const [showNotes, setshowNotes] = useState(false);
  const [showNotesSearch, setshowNotesSearch] = useState(false)
  const [searchValue, setsearchValue] = useState('');


  const toHome = () =>{
    setshowHomePage(true);
    setshowStudentBook(false);
    setshowTasks(false);
    setshowNotes(false);
    setshowTaskSearch(false);
    setshowStudentBookSearch(false);
    setshowNotesSearch(false);
  }

  const toTasks = () =>{
    setshowHomePage(false);
    setshowStudentBook(false);
    setshowTasks(true);
    setshowNotes(false);
    setshowTaskSearch(false);
    setshowStudentBookSearch(false);
    setshowNotesSearch(false);
  }

  const toStudentBook = () =>{
    setshowHomePage(false);
    setshowStudentBook(true);
    setshowTasks(false);
    setshowNotes(false);
    setshowTaskSearch(false);
    setshowStudentBookSearch(false);
    setshowNotesSearch(false);
  }

  const toNotes = () =>{
    setshowHomePage(false);
    setshowStudentBook(false);
    setshowTasks(false);
    setshowNotes(true);
    setshowTaskSearch(false);
    setshowStudentBookSearch(false);
    setshowNotesSearch(false);
  }

  const searchBtn = (a) =>{
    a.preventDefault()
    if(showTasks){
      setshowTaskSearch(true);
      setshowTasks(false);
    }
    if(showStudentBook){
      setshowStudentBookSearch(true);
      setshowStudentBook(false);
    }
    if(showNotes){
      setshowNotesSearch(true);
      setshowNotes(false);
    }
    if(showHomePage){
      window.alert('Swtich to Tasks, Notes or Student Book tab to use search Feature.')
    }
  }

  return (
    <>
    {/*Navigation bar componant*/}
      <NavBar 
      home={toHome} 
      tasks={toTasks} 
      studentBook={toStudentBook} 
      notes={toNotes}
      onChangeSearch={(a)=>{setsearchValue(a.target.value)}}
      searchValue={searchValue}
      onClickSearch={searchBtn} />

      <br />
      
      {showHomePage?  
      (<Home/>):
      null}

      {showTasks?
        (<Tasks/>):
        null
      }

    {showTaskSearch?
    (<SearchTasks
    searchValue={searchValue}
    />):
    null}

      {showStudentBook?
        (<StudentBook/>):
        null
      }

      {showStudentBookSearch?
      (<SearchStudentBook searchValue={searchValue}/>):null}

      {showNotes?
        (<Notes/>):
        null
      }

    {showNotesSearch?
    (<SearchNotes
    searchValue={searchValue}
    />):
    null}

    </>
  )
}

export default App
