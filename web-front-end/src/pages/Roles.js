import React, {Component} from 'react';
import * as eth from '../Ethereum/Api';
import { withRouter } from "react-router";
import Navbar from '../components/Navbar';

class Roles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addr: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.selectedRole = this.selectedRole.bind(this);
    };

    handleChange(event) {
        this.setState({addr: event.target.value});
    }

    selectedRole = (role) => {
        if (this.state.addr != '') {
            this.setState({isOpen: false});
            eth.addRole(this.state.addr, role.target.name)
        }
    };

    render() {
        // If no permissions enough
        if (!(eth.isAdmin() || eth.isPresi())) {
            return (
                <div>
                    <Navbar/>
                    <div className="container h-100">
                        <div className="row h-100 justify-content-center align-items-center">
                            <h1>Only President and Admin can manage roles</h1>
                        </div>
                    </div>
                </div>
            )
        }

        // If has permissions
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
                                           placeholder="0x74a9d333Bc7a58CF3995CF3E3GC581T7be3649C0"
                                           onChange={this.handleChange}/>
                                </div>
                            </div>

                            <div className="col-4 roles">
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" className="btn btn-secondary" name="Doctor" onClick={this.selectedRole}>Doctor</button>
                                    <button type="button" className="btn btn-secondary" name="Policeman" onClick={this.selectedRole}>Policeman</button>
                                    <button type="button" className="btn btn-secondary" name="Admin" onClick={this.selectedRole}>Admin</button>
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