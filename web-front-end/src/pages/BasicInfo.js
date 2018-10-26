import React from 'react';
import Navbar from '../components/Navbar';
import * as eth from '../Ethereum/Api';

export default class BasicInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            citizen: {name: '', surname: '', birthDate: '', gender: '', nationality: '', residence: '', city: '', idNum: ''}
        };
        eth.getCitizenBasicInfo(1).then( res => this.setState({citizen: res}) );
    }

    render() {
        return(
            <div>
                <Navbar name="John Doe"/>
                <p>name: {this.state.citizen.name}</p>
                <div className="container">
                    <form className="mt-5">
                        <div className="form-group">
                            <label htmlFor="name" className="control-label">Name</label>
                            <input type="text" className="form-control" id="name" name="name"
                                   value={this.state.citizen.name}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="surname" className="control-label">Surnames</label>
                            <input type="text" className="form-control" id="surname" name="surname"
                                   value={this.state.citizen.surname}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="date" className="control-label">Date of birth</label>
                            <input type="text" className="form-control" id="date" name="date"
                                   value={this.state.citizen.birthDate}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender" className="control-label">Género</label>
                            <input type="text" className="form-control" id="gender" name="gender"
                                   value={this.state.citizen.gender}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="nationality" className="control-label">Nacionalidad</label>
                            <input type="text" className="form-control" id="nationality" name="nationality"
                                   value={this.state.citizen.nationality}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address" className="control-label">Address</label>
                            <input type="text" className="form-control" id="address" name="address"
                                   value={this.state.citizen.address}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="city" className="control-label">City</label>
                            <input type="text" className="form-control" id="city" name="city"
                                   value={this.state.citizen.city}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="idNum" className="control-label">ID number</label>
                            <input type="text" className="form-control" id="idNum" name="idNum"
                                   value={this.state.citizen.idNum}/>
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}