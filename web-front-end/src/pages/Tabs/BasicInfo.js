import React, {Component} from 'react';
import * as eth from '../../Ethereum/Api';
import ReactLoading from 'react-loading';
import { withRouter } from "react-router";

class BasicInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            citizen: {
                name: '',
                surname: '',
                birthDate: '',
                gender: '',
                nationality: '',
                residence: '',
                city: '',
                idNum: ''
            },
            testing: null
        };
    }

    async componentDidMount() {
        const {match} = this.props;
        const ID = parseInt(match.params.id, 10);

        eth.getCitizenBasicInfo(ID).then(res => this.setState({citizen: res}));
        setTimeout(()=> this.setState({testing: 'Hey'}), 700);
    }

    render() {
        if (!this.state.testing) {
            return (
                <div>
                    <div className="container h-100">
                        <div className="row h-100 justify-content-center align-items-center">
                            <ReactLoading type="cylon" color="0000"/>
                            <h1>Loading...</h1>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="container">
                <form>
                    <div className="row">
                        <div className="col">
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
                        </div>
                        <div className="col">
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
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary float-right">Save</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(BasicInfo);