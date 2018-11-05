import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LogIn from './pages/LogIn';
import Access from './pages/Access';
import BasicInfo from './pages/BasicInfo';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={Access}/>
            <Route exact path="/login" component={LogIn}/>
            <Route path="/basicinfo/:id?" component={BasicInfo}/>
        </div>
    </Router>,
    document.getElementById('root')
);