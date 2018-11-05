import React from 'react'
import logo from '../logos/logo-white-no-back.png';

export default class Navbar extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <a href="/" className="navbar-brand">
                    <img src={logo} alt="" height="50"/>
                </a>

                <div className="collapse navbar-collapse ">
                    <ul className="navbar-nav ml-auto w-100 justify-content-end">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Account</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Add Citizen</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Citizen
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="/">Action</a>
                                <a className="dropdown-item" href="/">Another action</a>
                                <a className="dropdown-item" href="/">Something else here</a>
                            </div>
                        </li>

                    </ul>
                </div>
            </nav>
        )
    }
}