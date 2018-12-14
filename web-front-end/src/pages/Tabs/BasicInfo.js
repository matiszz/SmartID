import React, {Component} from 'react';
import * as eth from '../../Ethereum/Api';
import ReactLoading from 'react-loading';
import { withRouter } from "react-router";

class BasicInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        // Get ID and Citizen
        const {match} = this.props;
        const ID = parseInt(match.params.id, 10);
        let citizen = await eth.getCitizenBasicInfo(ID);

        // Set State
        this.setState({citizen: citizen});
    }

    /* To display the image label */
    getImgLabel() {
        if (this.state.citizen.picture)
            return this.state.citizen.picture.split("\\")[2];
        else
            return "Select picture";
    }

    /* Capture uploaded file */
    captureFile = event => {
        event.stopPropagation();
        event.preventDefault();

        const file = event.target.files[0];
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
        ctz.pictureChange = true;
        this.setState({citizen: ctz});
    };

    /* Handler for inputs */
    handleChange(event) {
        let citizen = {...this.state.citizen};
        citizen[event.target.name] = event.target.value;
        this.setState({citizen});
    }


    /* Handler for submit */
    async handleSubmit(event) {
        event.preventDefault();
        console.log('Modificando...', this.state.citizen);
        let res = await eth.modify_citizen(this.state.citizen);
        console.log('heyy', res);
        //     .then(
        //     (res) => {
        //         console.log(res);
        //         if (res && res.success) this.setState({transactionHash: res.hash, openModal: true});
        //     }
        // );
    }

    render() {
        // Loading
        if (!this.state.citizen) {
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
        // Loaded
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        {/*First Col*/}
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="name" className="control-label">Name</label>
                                <input type="text" className="form-control" id="name" name="name"
                                       defaultValue={this.state.citizen.name} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="surname" className="control-label">Surnames</label>
                                <input type="text" className="form-control" id="surname" name="surname"
                                       defaultValue={this.state.citizen.surname} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="date" className="control-label">Date of birth</label>
                                <input type="text" className="form-control" id="date" name="date"
                                       defaultValue={this.state.citizen.birthDate} disabled onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="gender" className="control-label">Género</label>
                                <input type="text" className="form-control" id="gender" name="gender"
                                       defaultValue={this.state.citizen.gender} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="nationality" className="control-label">Nacionalidad</label>
                                <input type="text" className="form-control" id="nationality" name="nationality"
                                       defaultValue={this.state.citizen.nationality} disabled onChange={this.handleChange}/>
                            </div>
                        </div>

                        {/*Second Col*/}
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="address" className="control-label">Address</label>
                                <input type="text" className="form-control" id="address" name="address"
                                       defaultValue={this.state.citizen.residence} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="city" className="control-label">City</label>
                                <input type="text" className="form-control" id="city" name="city"
                                       defaultValue={this.state.citizen.city} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="idNum" className="control-label">ID number</label>
                                <input type="text" className="form-control" id="idNum" name="idNum"
                                       defaultValue={this.state.citizen.idNum} disabled onChange={this.handleChange}/>
                            </div>
                            <label htmlFor="picture" className="control-label">Picture</label>
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="picture" name="picture"
                                       onChange={this.captureFile}/>
                                <label className="custom-file-label" htmlFor="customFile">Image</label>
                            </div>
                            <div className="form-group mt-5">
                                <button type="submit" className="btn btn-primary float-right">Save</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(BasicInfo);