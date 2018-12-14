import React, {Component} from 'react';
import * as eth from '../../Ethereum/Api';
import ReactLoading from 'react-loading';
import { withRouter } from "react-router";

class BasicInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
        };
    }

    async componentDidMount() {
        const {match} = this.props;
        const ID = parseInt(match.params.id, 10);

        let records = await eth.getLegalRecords(ID);
        this.setState({records: records});
        console.log(this.state.records);
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
            <div>
                <div className="container">
                    {this.state.records.map((elem) =>
                        <div className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{elem.date}</h5>
                                <input type="checkbox" checked={elem.valid}></input>
                            </div>
                            <p className="mb-1">{elem.record}</p>
                        </div>)}
                        <div className="input-group mt-5">
                            <input type="text" className="form-control" placeholder="Add new record"></input>
                            <div className="input-group-append">
                                <button className="input-group-text">Add</button>
                            </div>
                        </div>
                    <small>21/32 characters</small>
                </div>
            </div>
        );
    }
}

export default withRouter(BasicInfo);