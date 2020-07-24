import React from 'react'

import './navbar.css'

import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'




function Navbar() {


    const dispatch = useDispatch();


    return (

        <nav className="navbar navbar-expand-lg">
            <span className="navbar-brand text-white font-weight-bold ml-2" ><i className="fab fa-ethereum fa-2x"></i></span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fas fa-align-justify text-white"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>

                    {

                        useSelector(state => state.userLogged) !== 0 ?

                            <>
                                <li className="nav-item"><Link className="nav-link" to="/events/myEvents">My Events</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/registerEvent">Publish your Party</Link></li>
                                <li className="nav-item"><Link className="nav-link" onClick={()=> dispatch({type:'LOG_OUT'})} to="/login" >Logout</Link></li>
                            </>
                            :
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/newUser">Sign up</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                            </>

                    }

                </ul>
            </div>
        </nav>
    )
}

export default Navbar;