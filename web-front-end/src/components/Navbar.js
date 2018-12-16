import React from 'react'
import logo from '../logos/logo-white-no-back.png';
import * as eth from '../Ethereum/Api';
import {withRouter} from 'react-router';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: false
        };
    }

    navigate = (event) => {
        let page = event.target.name;
        this.props.history.push({
            pathname: `/${page}`,
        });
    };

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
                            <a className="nav-link" href="#" name="" onClick={this.navigate}>Home</a>
                        </li>
                        {(this.state.admin || this.state.presi) && <li className="nav-item"><a className="nav-link" href="#" name="new" onClick={this.navigate}>Add Citizen</a></li>}
                        {this.state.admin && <li className="nav-item"> <a className="nav-link" href="#" name="roles" onClick={this.navigate}>Manage Roles</a> </li>}
                    </ul>
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar);