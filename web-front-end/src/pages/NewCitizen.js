import React, {Component} from 'react';
import Navbar from '../components/Navbar';
import * as eth from '../Ethereum/Api';
import { withRouter } from "react-router";
import Modal from "react-responsive-modal";

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
                idNum: ''
            },
            transactionHash: '',
            openModal: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() { }

    handleChange(event) {
        let citizen = {...this.state.citizen};
        citizen[event.target.name] = event.target.value;
        this.setState({citizen});
    }

    handleSubmit(event) {
        event.preventDefault();
        eth.registerCitizen(this.state.citizen).then(
            (res) => {
                console.log(res);
                if (res && res.success) this.setState({transactionHash: res.hash, openModal: true});
            }
        );
    }

    onCloseModal = () => {
        this.setState({openModal: false});
    };

    render() {
        return (
            <div>
                <Navbar name="John Doe"/>
                <div className="container">
                    <form className="mt-5" onSubmit={this.handleSubmit}>
                        <h1>New citizen</h1>
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

                        <div className="form-group">
                            <button type="submit" className="btn btn-success float-right">Add citizen</button>
                        </div>
                    </form>
                </div>

                {/*MODAL*/}
                <Modal open={this.state.openModal} onClose={this.onCloseModal} center>
                    <h4>Citizen uploaded</h4>
                    <p>The transaction hash is: <a href={`https://ropsten.etherscan.io/tx/${this.state.transactionHash}`} target='_blank'>{this.state.transactionHash}</a></p>
                    <button className="btn btn-info" onClick={this.accesInfo}>Access information</button>
                </Modal>
            </div>
        );
    }
}

export default withRouter(NewCitizen);