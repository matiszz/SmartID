import React from 'react';
import Navbar from '../components/Navbar';

export default class Access extends React.Component {
    render() {
        return(
            <div>
                <Navbar name="John Doe"/>
                <div className="container">
                    <div className="row justify-content-center centrado">
                        <div className="col-6 col-lg-3 access-button">
                            <a href="/login"><button className="btn btn-secondary w-100 h-100">Scann QR</button></a>
                        </div>
                        <div className="col-6 col-lg-3 access-button">
                            <button className="btn btn-info w-100 h-100">
                                <input type="text" className="align-top form-control" placeholder="ID number"/>
                                Introduce ID number
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}