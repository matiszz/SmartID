import React, {Component} from 'react';
import * as eth from '../Ethereum/Api';
import ReactLoading from 'react-loading';
import { withRouter } from "react-router";

import Navbar from '../components/Navbar';

class Roles extends Component {

    render() {
        return (
            <div>
                <Navbar/>
                <div className="container">
                    <h1>Manage roles</h1>

                </div>
            </div>
        );
    }
}

export default withRouter(Roles);