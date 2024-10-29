import './nav-bar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav } from 'react-bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css';

const NavBar = (props) =>{
    return(
        <Nav  className="navbar bg-body-primary" >
            <div id='nav-bar' className="container-fluid">
                <ul className="nav nav-underline">
                    <li  onClick={props.home} id='logo' className="nav-item">
                        <a className="nav-link disabled"  area-disabled='true' href="#">StudCord</a>
                    </li>
                    <li onClick={props.tasks} id='tabs' className="nav-item">
                        <a id='tab' className="nav-link" href="#">Tasks</a>
                    </li>
                    <li onClick={props.notes} id='tabs' className="nav-item">
                        <a className="nav-link" href="#">Notes</a>
                    </li>
                    <li onClick={props.studentBook} id='tabs' className="nav-item">
                        <a className="nav-link" href='#'>Student Book</a>
                    </li>
                </ul>
                <form id='search-bar' className="d-flex" role="search">
                    <input id='search' className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                <div id='logo-bar'>
                    <i id='icon' className="bi bi-github"></i>
                    <i id='icon' className="bi bi-youtube"></i>
                </div>
            </div>
        </Nav>
    )
}

export default NavBar