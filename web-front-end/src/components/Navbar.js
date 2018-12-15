import React from 'react'
import logo from '../logos/logo-white-no-back.png';
import * as eth from '../Ethereum/Api';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: false
        };
    }

    async componentDidMount() {
        let result = await eth.isAdmin();
        this.setState({admin: result})
    }

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
                        {(this.state.admin || this.state.presi) && <li className="nav-item"><a className="nav-link" href="/new">Add Citizen</a></li>}
                        {this.state.admin && <li className="nav-item"> <a className="nav-link" href="/roles">Manage Roles</a> </li>}
                    </ul>
                </div>
            </nav>
        )
    }
}