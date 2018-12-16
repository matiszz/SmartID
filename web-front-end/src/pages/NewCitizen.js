import React, {Component} from 'react';
import Navbar from '../components/Navbar';
import * as eth from '../Ethereum/Api';
import { withRouter } from "react-router";

import * as Notification from '../components/Notification';
import { NotificationContainer } from "react-notifications";

class NewCitizen extends Component {

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
                idNum: '',
                picture: null
            },
            imageLabel: 'Select image'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /* Handler for inputs */
    handleChange(event) {
        let citizen = {...this.state.citizen};
        citizen[event.target.name] = event.target.value;
        this.setState({citizen});
    }

    /* Handler for submit */
    async handleSubmit(event) {
        event.preventDefault();
        let result = await eth.registerCitizen(this.state.citizen);

        Notification.success(result.hash);
        setTimeout( () => {
            this.props.history.push({
                pathname: '/',
            });
        }, 5000)
    }

    /* Capture uploaded file */
    captureFile = event => {
        event.stopPropagation();
        event.preventDefault();

        const file = event.target.files[0];

        // Set the label
        this.setState({imageLabel: file.name});

        let reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => this.convertToBuffer(reader);
    };

    /* Convert file to buffer and set it in state*/
    convertToBuffer = async reader => {
        // Primero convertimos a buffer el archivo
        const buffer = await Buffer.from(reader.result);
        // Luego lo asignamos a nuestro state
        let ctz = this.state.citizen;
        ctz.picture = buffer;
        this.setState({citizen: ctz});
    };

    render() {
        return (
            <div>
                <Navbar/>
                <div className="container">
                    <h1>New citizen</h1>
                    <form className="mt-5" onSubmit={this.handleSubmit}>
                        <div className="row">
                            {/*First col*/}
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Name</label>
                                    <input type="text" className="form-control" id="name" name="name"
                                           onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="surname" className="control-label">Surnames</label>
                                    <input type="text" className="form-control" id="surname" name="surname"
                                           onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="date" className="control-label">Date of birth</label>
                                    <input type="text" className="form-control" id="date" name="birthDate"
                                           onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="gender" className="control-label">Género</label>
                                    <input type="text" className="form-control" id="gender" name="gender"
                                           onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nationality" className="control-label">Nacionalidad</label>
                                    <input type="text" className="form-control" id="nationality" name="nationality"
                                           onChange={this.handleChange}/>
                                </div>
                            </div>

                            {/*Second col*/}
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="address" className="control-label">Address</label>
                                    <input type="text" className="form-control" id="address" name="residence"
                                           onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="city" className="control-label">City</label>
                                    <input type="text" className="form-control" id="city" name="city"
                                           onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="idNum" className="control-label">ID number</label>
                                    <input type="text" className="form-control" id="idNum" name="idNum"
                                           onChange={this.handleChange}/>
                                </div>
                                <label htmlFor="picture" className="control-label">Picture</label>
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="picture" name="picture"
                                           onChange={this.captureFile}/>
                                        <label className="custom-file-label" htmlFor="customFile">{this.state.imageLabel}</label>
                                </div>

                                <div className="form-group mt-5">
                                    <button type="submit" className="btn btn-success float-right">Add citizen</button>
                                </div>
                            </div>
                        </div>

                    </form>
                    <NotificationContainer/>
                </div>
            </div>
        );
    }
}

export default withRouter(NewCitizen);