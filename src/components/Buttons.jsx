import 'bootstrap/dist/css/bootstrap.min.css'

//Add btn
export const AddBtn =  (props) =>{
    return(<>
    <button type="button" className="btn btn-success"  onClick={props.onClick}>{props.name}</button>
</>
)
}

//Cancle btn
export const CancleBtn = (props) =>{
    return(
        <button type="button"  onClick={props.onClick} class="btn btn-danger">Cancle</button>    )
}

//Delete btn
export const DelBtn = (props) =>{
    return(
        <button onClick={props.onClick} type="button" class="btn btn-outline-danger">delete</button>    )
}

//Edit btn
export const EditBtn = (props) =>{
    return(
        <button  onClick={props.onClick} type="button" class="btn btn-outline-primary">edit</button>    )
}


//Button for Tasks page:
export const TaskAdderBtn = (props) =>{
    return(
        <button type="button, submit" className="btn btn-success"  onClick={props.onClick}>add task</button>
    )
}

//Button for Notes page:
export const NoteAdderBtn = (props) =>{
    return(
        <button type="button, submit" className="btn btn-success"  onClick={props.onClick}>add note</button>
    )
}

//Buttons for Student Record:
export const RecordAdderBtn = (props) =>{
    return(
        <button type="button, submit" className="btn btn-success"  onClick={props.onClick}>add record</button>
    )
}

export const RecordAdderCloseBtn = (props) =>{
    return(
        <button type="button"  onClick={props.onClick} class="btn btn-danger">Cancle</button>    )
}

export const RecordEditBtn = (props) =>{
    return(
        <button type="button, submit" className="btn btn-success"  onClick={props.onClick}>update record</button>
    )
}