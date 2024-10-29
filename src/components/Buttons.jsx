import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap'

export const AddBtn =  (props) =>{
    return(<>
    <button type="button" class="btn btn-success" onClick={props.onClick}>{props.name}</button>
</>
)
}