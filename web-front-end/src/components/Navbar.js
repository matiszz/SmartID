import React from 'react'
import './navbar.css'
import profile from '../images/sample-img.jpg'

export default class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a className="navbar-brand" href="/">
                    <img src={profile} alt="" className="profile-photo mr-3" width="40" height="40"/>
                    {this.props.name}
                </a>
            </nav>
        )
    }
}