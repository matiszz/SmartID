import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LogIn from './pages/LogIn';
import Access from './pages/Access';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={Access}/>
            <Route path="/login" component={LogIn}/>
        </div>
    </Router>,
    document.getElementById('root')
);