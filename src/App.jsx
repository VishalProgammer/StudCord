import { useState } from 'react'
import './App.css'
import NavBar from './components/nav-bar'
import { Home } from './Pages/homePage'
import { Tasks } from './Pages/tasks'
import { StudentBook } from './Pages/studentBook'
import { Notes } from './Pages/notes'


function App() {
  const [showHomePage, setshowHomePage] = useState(true);
  const [showTasks, setshowTasks] = useState(false);
  const [showStudentBook, setshowStudentBook] = useState(false);
  const [showNotes, setshowNotes] = useState(false)


  const toHome = () =>{
    setshowHomePage(true);
    setshowStudentBook(false);
    setshowTasks(false);
    setshowNotes(false);
  }

  const toTasks = () =>{
    setshowHomePage(false);
    setshowStudentBook(false);
    setshowTasks(true);
    setshowNotes(false);
  }

  const toStudentBook = () =>{
    setshowHomePage(false);
    setshowStudentBook(true);
    setshowTasks(false);
    setshowNotes(false);
  }

  const toNotes = () =>{
    setshowHomePage(false);
    setshowStudentBook(false);
    setshowTasks(false);
    setshowNotes(true);
  }

  return (
    <>
    {/*Navigation bar componant*/}
      <NavBar 
      home={toHome} 
      tasks={toTasks} 
      studentBook={toStudentBook} 
      notes={toNotes} />

      <br />
      
      {showHomePage?  
      (<Home/>):
      null}

      {showTasks?
        (<Tasks/>):
        null
      }

      {showStudentBook?
        (<StudentBook/>):
        null
      }

      {showNotes?
        (<Notes/>):
        null
      }

    </>
  )
}

export default App
