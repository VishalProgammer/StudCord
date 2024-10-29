import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap'

export const AddBtn =  (props) =>{
    return(<>
    <button type="button" className="btn btn-success"  onClick={props.onClick}>{props.name}</button>
</>
)
}

export const TaskAdderBtn = (props) =>{
    return(
        <button type="button, submit" className="btn btn-success"  onClick={props.onClick}>add task</button>
    )
}

export const NoteAdderBtn = (props) =>{
    return(
        <button type="button, submit" className="btn btn-success"  onClick={props.onClick}>add note</button>
    )
}

export const NoteAdderCloseBtn = (props) =>{
    return(
        <button type="button"  onClick={props.onClick} class="btn btn-danger">Cancle</button>    )
}

export const DelNoteBtn = (props) =>{
    return(
        <button onClick={props.onClick} type="button" class="btn btn-outline-danger">delete</button>    )
}

export const EditNoteBtn = (props) =>{
    return(
        <button  onClick={props.onClick} type="button" class="btn btn-outline-primary">edit</button>    )
}