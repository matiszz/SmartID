import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Access from './pages/Access';
import Citizen from './pages/Citizen';
import NewCitizen from './pages/NewCitizen';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={Access}/>
            <Route exact path="/citizen/:id?" component={Citizen}/>
            <Route path="/new" component={NewCitizen}/>
        </div>
    </Router>,
    document.getElementById('root')
);