import React, {Component} from 'react';
import * as eth from '../../Ethereum/Api';
import ReactLoading from 'react-loading';
import { withRouter } from "react-router";
import * as Notification from "../../components/Notification";

class BasicInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            newRecord: '',
            noRecords: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteRecord = this.deleteRecord.bind(this);

    }

    async componentDidMount() {
        const {match} = this.props;
        const ID = parseInt(match.params.id, 10);

        let numRecords = await eth.getNumberClinicRecords(ID);
        if (numRecords === 0) this.setState({noRecords: true});

        let recordsClinic = await eth.getClinicRecords(ID);
        this.setState({records: recordsClinic});
    }

    /* Handler for inputs */
    handleChange(event) {
        this.setState({newRecord: event.target.value});
    }

    /* Handler for submitting */
    async handleSubmit() {
        const {match} = this.props;
        let ID = parseInt(match.params.id, 10);
        let record = this.state.newRecord;
        let date = new Date().toLocaleDateString('es-Es');

        if (record !== ''){
            let result = await eth.registerClinicRecord(ID, record, date);
            const records = this.state.records.slice().concat([{ 0: record, [1]: date, [2]: true }]);
            this.setState({noRecords: false});

            this.setState({ records, newRecord: '' });
            Notification.success(result.hash);
        }
    }

    async deleteRecord(pos) {
        const {match} = this.props;
        let ID = parseInt(match.params.id, 10);

        let result = await eth.deleteClinicRecord(ID, pos);
        Notification.success(result.hash);
    }

    render() {
        if (this.state.noRecords) {
            return (
                <div>
                    <div className="container h-100-justify-content-center align-items-center">
                        <h2>No clinic records</h2>
                    </div>
                    <div className="input-group my-5">
                        <input type="text" className="form-control" placeholder="Add new record"
                               onChange={this.handleChange}/>
                        <div className="input-group-append">
                            <button className="input-group-text" onClick={this.handleSubmit}
                                    disabled={this.state.newRecord === ''}>Add</button>
                        </div>
                    </div>
                </div>
            );
        } else if (this.state.records.length === 0) {
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
            <div>
                <div className="container">
                    {this.state.records.map((elem, position) =>
                        <div className="list-group-item list-group-item-action flex-column align-items-start" key={position}>
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{elem[1]}</h5>
                            </div>
                            <p className="mb-1">{elem[0]}</p>
                        </div>)}
                        <div className="input-group my-5">
                            <input type="text" className="form-control" placeholder="Add new record" value={this.state.newRecord}
                                   onChange={this.handleChange}/>
                            <div className="input-group-append">
                                <button className="input-group-text" onClick={this.handleSubmit}
                                        disabled={this.state.newRecord === ''}>Add</button>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}

export default withRouter(BasicInfo);