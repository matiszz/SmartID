import React from 'react'
import logo from '../logos/logo-white-no-back.png';

export default class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-5">
                <a href="/" className="navbar-brand">
                    <img src={logo} alt="" height="50"/>
                </a>

                <div className="collapse navbar-collapse ">
                    <ul className="navbar-nav ml-auto w-100 justify-content-end">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/new">Add Citizen</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}