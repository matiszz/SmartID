import React, {Component} from 'react';
import * as eth from '../Ethereum/Api';
import ReactLoading from 'react-loading';
import { withRouter } from "react-router";

import Navbar from '../components/Navbar';

class Roles extends Component {

    state = {
        isOpen: false
    };

    toggleOpen = () => this.setState({isOpen: !this.state.isOpen});
    selectedRole = (role) => {
        this.setState({isOpen: false});
        // TODO: Link with API
    };

    render() {
        const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
        return (
            <div>
                <Navbar/>
                <div className="container">
                    <h1>Manage roles</h1>
                    <form>
                        <div className="row">
                            <div className="col-8">
                                <div className="form-group">
                                    <label htmlFor="addr" className="control-label">Address</label>
                                    <input type="text" className="form-control" id="addr" name="addr"
                                           placeholder="0x74a9d333Bc7a58CF3995CF3E3GC581T7be3649C0"/>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="btn-group mt-4">
                                    <button type="button" className="btn btn-info dropdown-toggle" onClick={this.toggleOpen}>
                                        Roles
                                    </button>
                                    <div className={menuClass}>
                                        <a className="dropdown-item" href="#" onClick={this.selectedRole}>Admin</a>
                                        <a className="dropdown-item" href="#" onClick={this.selectedRole}>Doctor</a>
                                        <a className="dropdown-item" href="#" onClick={this.selectedRole}>Policeman</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Roles);