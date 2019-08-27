import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './css/index.css'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./js/pages/Home";
import Statistics from "./js/pages/Statistics";
import Error from "./js/pages/Error";
import NavBar from "./js/Components/NavBar";


ReactDOM.render(
    <BrowserRouter>
        <NavBar/>
        <Switch>
            <Route exact path={'/'} component={Statistics}/>
            <Route exact path={'/statistics'} component={Statistics}/>
            <Route component={Error}/>
        </Switch>
    </BrowserRouter>
    , document.getElementById('root'));


serviceWorker.unregister();
