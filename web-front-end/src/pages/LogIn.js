import React from 'react';

export default class LogIn extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-8 centrado">
                        <h1>BlockID</h1><br/><br/>
                        <form action="/">
                            <input type="email" className="form-control mb-5" name="mail" placeholder="Enter email"/>
                            <br/>
                            <input type="password" className="form-control mb-5" name="password" placeholder="Password"/>
                            <br/>
                            <button className="login btn btn-success" type="submit">Log In</button>
                        </form>
                        <div className="row mt-5">
                            <div className="col d-flex justify-content-start">
                                <a href="/">About</a>
                            </div>
                            <div className="col d-flex justify-content-end">
                                <a href="/">Forgot password?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}