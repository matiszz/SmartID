import React from 'react';
import Navbar from '../components/Navbar';

export default class BasicInfo extends React.Component {
    render() {
        return(
            <div>
                <Navbar name="John Doe"/>
                <div className="container">
                    <form className="mt-5">
                        <div className="form-group">
                            <label htmlFor="name" className="control-label">Name</label>
                            <input type="text" className="form-control" id="name" name="name"
                                   placeholder="John"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="surname" className="control-label">Surnames</label>
                            <input type="text" className="form-control" id="surname" name="surname"
                                   placeholder="Deer"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="date" className="control-label">Date of birth</label>
                            <input type="text" className="form-control" id="date" name="date"
                                   placeholder="DD/MM/YYYY" disabled/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender" className="control-label">Género</label>
                            <input type="text" className="form-control" id="gender" name="gender"
                                   placeholder="Masculine"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="nationality" className="control-label">Nacionalidad</label>
                            <input type="text" className="form-control" id="nationality" name="nationality"
                                   placeholder="Spanish" disabled/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address" className="control-label">Address</label>
                            <input type="text" className="form-control" id="address" name="address"
                                   placeholder="Mc Arthur Av."/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="city" className="control-label">City</label>
                            <input type="text" className="form-control" id="city" name="city"
                                   placeholder="London"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="idNum" className="control-label">ID number</label>
                            <input type="text" className="form-control" id="idNum" name="idNum"
                                   placeholder="12345678J" disabled/>
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