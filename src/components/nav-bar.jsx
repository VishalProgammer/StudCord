import './nav-bar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav } from 'react-bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css';

const NavBar = (props) =>{
    return(
        <Nav  class="navbar bg-body-primary" >
            <div id='nav-bar' class="container-fluid">
                <ul class="nav nav-underline">
                    <li  onClick={props.home} id='logo' class="nav-item">
                        <a class="nav-link disabled"  area-disabled='true' href="#">StudCord</a>
                    </li>
                    <li onClick={props.tasks} id='tabs' class="nav-item">
                        <a id='tab' class="nav-link" href="#">Tasks</a>
                    </li>
                    <li onClick={props.notes} id='tabs' class="nav-item">
                        <a class="nav-link" href="#">Notes</a>
                    </li>
                    <li onClick={props.studentBook} id='tabs' class="nav-item">
                        <a class="nav-link" href='#'>Student Book</a>
                    </li>
                </ul>
                <form id='search-bar' class="d-flex" role="search">
                    <input id='search' class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
                <div id='logo-bar'>
                    <i id='icon' class="bi bi-github"></i>
                    <i id='icon' class="bi bi-youtube"></i>
                </div>
            </div>
        </Nav>
    )
}

export default NavBar