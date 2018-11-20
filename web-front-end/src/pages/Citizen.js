import React, {Component} from 'react';
import { withRouter } from "react-router";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ReactLoading from 'react-loading';

import imagen from '../images/john-doe.jpg';

import Navbar from '../components/Navbar';
import BasicInfo from './Tabs/BasicInfo';
import ClinicRecords from './Tabs/ClinicRecords';
// import LegalRecords from './Tabs/LegalRecords';
import * as eth from '../Ethereum/Api';

class Citizen extends Component {
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
            loading: null
        };
    }

    async componentDidMount() {
        const {match} = this.props;
        const ID = parseInt(match.params.id, 10);

        eth.getCitizenBasicInfo(ID).then(res => this.setState({citizen: res}));
        setTimeout(()=> this.setState({loading: "Hey"}), 700);
    }

    render() {
        if (!this.state.loading) {
            return (
                <div>
                    <Navbar/>
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
            <div>
                <Navbar/>
                <div className="container h-100">

                    {/*Title*/}
                    <h1>Citizen information</h1>

                    {/*Display basic info*/}
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-8">
                                    <h5 className="card-title">{this.state.citizen.name} {this.state.citizen.surname}</h5>
                                    <hr/>
                                    <p className="card-text">
                                        <b>Birth date:</b> {this.state.citizen.birthDate} <br/>
                                        <b>Gender:</b> {this.state.citizen.gender} <br/>
                                        <b>Address:</b> {this.state.citizen.residence} <br/>
                                        <b>City:</b> {this.state.citizen.city} <br/>
                                        <b>Nationality:</b> {this.state.citizen.nationality} <br/>
                                        <b>ID number:</b> {this.state.citizen.idNum} <br/>
                                    </p>
                                </div>
                                <div className="col-4">
                                    {/*TODO: Image from IPFS*/}
                                    <img className="rounded img-fluid float-right profile-img" src={imagen} alt="Card image cap"/>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/*Tabs*/}
                    <Tabs className="mt-2">
                        <TabList>
                            <Tab>Basic information</Tab>
                            {/*<Tab>Legal records</Tab>*/}
                            <Tab>Clinic records</Tab>
                        </TabList>

                        <TabPanel><BasicInfo></BasicInfo></TabPanel>
                        {/*<TabPanel><LegalRecords></LegalRecords></TabPanel>*/}
                        <TabPanel><ClinicRecords></ClinicRecords></TabPanel>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default withRouter(Citizen);