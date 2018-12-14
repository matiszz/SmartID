import React, {Component} from 'react';
import * as eth from '../Ethereum/Api';
import { withRouter } from "react-router";
import Navbar from '../components/Navbar';

class Roles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addr: '',
            Doctor: false,
            Police: false,
            Admin: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.selectedRole = this.selectedRole.bind(this);
        this.getColor = this.getColor.bind(this);
    };

    async handleChange(event) {
        this.setState({addr: event.target.value});
        if (this.state.addr.length === 42) {

            let Doctor = await eth.hasSpecificRole(this.state.addr, 'Doctor');
            let Police = await eth.hasSpecificRole(this.state.addr, 'Police');
            let Admin  = await eth.hasSpecificRole(this.state.addr, 'Admin');

            this.setState({
                Doctor: Doctor,
                Police: Police,
                Admin: Admin,
            })
        }
    }

    selectedRole = (event) => {
        let role = event.target.name;

        if (this.state.addr.length === 42) {
            if (this.state[role]) eth.removeRole(this.state.addr, role);
            else eth.addRole(this.state.addr, role);
        }
    };

    getColor(role) {
        const blue = {backgroundColor: '#1976D2'};
        const neutral = {backgroundColor: '#9E9E9E'};

        if (this.state[role]) return blue; else return neutral;
    }

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
                                {(this.state.addr.length !== 42) && <p className="text-danger">Invalid address format</p>}
                            </div>

                            <div className="col-4 roles">
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" className="btn" style={this.getColor('Doctor')}
                                            name="Doctor" disabled={this.state.addr.length !== 42} onClick={this.selectedRole}>Doctor
                                    </button>
                                    <button type="button" className="btn" style={this.getColor('Police')}
                                            name="Police" disabled={this.state.addr.length !== 42} onClick={this.selectedRole}>Policeman
                                    </button>
                                    <button type="button" className="btn" style={this.getColor('Admin')}
                                            name="Admin" disabled={this.state.addr.length !== 42} onClick={this.selectedRole}>Admin
                                    </button>
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