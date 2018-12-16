import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import logo from '../logos/logo-blue-no-back.png';
import Modal from 'react-responsive-modal';
import {withRouter} from 'react-router';

class Access extends React.Component {
    constructor(props) {
        super(props);
        this.state = {openModal: false, idNumber: null};
    }

    accesInfo = () => {
        this.props.history.push({
            pathname: `/citizen/${this.state.idNumber}`,
        });
    };

    onOpenModal = () => {
        this.setState({openModal: true});
    };

    onCloseModal = () => {
        this.setState({openModal: false});
    };

    createNotification = (type, title, msg) => {
        return () => {
            switch (type) {
                case 'info':
                    NotificationManager.info(msg, title, 3000);
                    break;
                case 'success':
                    NotificationManager.success(msg, title, 3000);
                    break;
                case 'warning':
                    NotificationManager.warning(msg, title, 3000);
                    break;
                case 'error':
                    NotificationManager.error(msg, title, 3000, () => {
                        alert('callback');
                    });
                    break;
                default:
                    NotificationManager.success(msg, title, 3000);
                    break;
            }
        };
    };

    handleChange = (event) => {
        this.setState({idNumber: event.target.value});
    };

    render() {
        return (
            <div>
                <Navbar name="John Doe"/>
                <div className="container">
                    <img src={logo} className="img-fluid" alt=""/>

                    <p className="text-center">Welcome to Smart<b>ID</b>, the identification of the future. Please, scan
                        QR code or enter ID number to access citizen's information.
                        Be sure to have <a href="https://metamask.io/">MetaMask</a> enabled with your account.</p>

                    <div className="row justify-content-center centrado mb-5">
                        {/*Scann QR*/}
                        <div className="col-6 col-lg-3 access-button">
                            <button className="btn btn-secondary w-100 h-100"
                                    onClick={this.createNotification('warning', 'No QR reader', 'You don\'t have a QR reader connected')}>
                                Scann QR
                            </button>
                        </div>

                        {/*Input ID number*/}
                        <div className="col-6 col-lg-3 access-button">
                            <button className="btn btn-info w-100 h-100"
                                    onClick={() => this.onOpenModal()}>
                                Introduce ID number
                            </button>
                        </div>
                    </div>

                    <h1 className="text-center mt-5">What is Smart<b>ID</b>?</h1>
                    <p className="text-center mb-5">Smart<b>ID</b> is a prototype of the ID ofv the future. It does not
                        make sense to be in full 2018 and have to queue at the police station to ask for the municipal
                        registration papers, then another queue at the town hall to ask for a change of address, and
                        another to renew your passport. SmartID wants to put an end to bureaucracy and wasting time
                        waiting for documents. We want to democratize the citizens' data, because they are ours. We want
                        to build a decentralized system, safe, but above all accessible. Why is it that if one day you
                        decide to change your medical centre, they don't have any of your data? SmartID provides you
                        with all your data in a single interface. However, your data will not be owned by a single
                        institution, but will be distributed in the Ethereum network.</p>
                </div>

                {/*MODAL*/}
                <Modal open={this.state.openModal} onClose={this.onCloseModal} center>
                    <h4>Introduce ID number</h4>
                    <div className="form-group">
                        <input type="text" className="form-control" id="number" onChange={this.handleChange}/>
                    </div>
                    <button className="btn btn-info" onClick={this.accesInfo}>Access information</button>
                </Modal>

                <NotificationContainer/>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(Access);