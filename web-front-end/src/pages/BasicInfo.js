import React from 'react';
import Navbar from '../components/Navbar';
import * as eth from '../Ethereum/Api';

export default class BasicInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            citizen: null,
            testeo: ''
        };
    }

    componentDidMount() {
        eth.getCitizenBasicInfo(1).then( res => {
            this.setState({citizen: res});
            console.log(this.state);
        });
    }

    // For testing
    log() {
        console.log(this.state);
        console.log(this.state.citizen);
        this.setState({testeo: 'Holaaaa'});
    }

    render() {
        if (!this.state.citizen) {
            console.log('Nooop')
            return <h1>Loading...</h1>
        }
        return(
            <div>
                <Navbar name="John Doe"/>
                {/*For testing*/}
                <h1>{this.state.testeo}</h1>
                <button onClick={() => this.log()}>Log!</button>

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
                                   defaultValue={this.state.citizen.birthDate}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender" className="control-label">Género</label>
                            <input type="text" className="form-control" id="gender" name="gender"
                                   defaultValue={this.state.citizen.gender}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="nationality" className="control-label">Nacionalidad</label>
                            <input type="text" className="form-control" id="nationality" name="nationality"
                                   defaultValue={this.state.citizen.nationality}/>
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
                                   defaultValue={this.state.citizen.idNum}/>
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