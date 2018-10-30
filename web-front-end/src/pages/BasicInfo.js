import React from 'react';
import Navbar from '../components/Navbar';
import * as eth from '../Ethereum/Api';

export default class BasicInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            citizen:  {name: '', surname: '', birthDate: '', gender: '', nationality: '', residence: '', city: '', idNum: ''},
            testing: null
        };

    }

    componentDidMount() {
        eth.getCitizenBasicInfo(1).then( res => {
            this.setState({citizen: res});
        });

        setTimeout(() => this.setState({testing: 'Hey'}), 500);
    }

    render() {
        if (!this.state.testing) {
            return (
                <div>
                    <Navbar name="John Doe"/>
                    <h1 className="center">Loading...</h1>
                </div>
            )
        }
        return(
            <div>
                <Navbar name="John Doe"/>
                <div className="container">
                    <form className="mt-5">
                        <div className="form-group">
                            <label htmlFor="name" className="control-label">Name</label>
                            <input type="text" className="form-control" id="name" name="name"
                                   defaultValue={this.state.citizen.name}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="surname" className="control-label">Surnames</label>
                            <input type="text" className="form-control" id="surname" name="surname"
                                   defaultValue={this.state.citizen.surname}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="date" className="control-label">Date of birth</label>
                            <input type="text" className="form-control" id="date" name="date"
                                   defaultValue={this.state.citizen.birthDate} disabled/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender" className="control-label">Género</label>
                            <input type="text" className="form-control" id="gender" name="gender"
                                   defaultValue={this.state.citizen.gender}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="nationality" className="control-label">Nacionalidad</label>
                            <input type="text" className="form-control" id="nationality" name="nationality"
                                   defaultValue={this.state.citizen.nationality} disabled/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address" className="control-label">Address</label>
                            <input type="text" className="form-control" id="address" name="address"
                                   defaultValue={this.state.citizen.residence}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="city" className="control-label">City</label>
                            <input type="text" className="form-control" id="city" name="city"
                                   defaultValue={this.state.citizen.city}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="idNum" className="control-label">ID number</label>
                            <input type="text" className="form-control" id="idNum" name="idNum"
                                   defaultValue={this.state.citizen.idNum} disabled/>
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