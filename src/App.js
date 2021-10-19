import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import './App.css';
import Home from "./components/layout/pages/Home";
import User from "./components/users/User";
import Alert from "./components/layout/Alert";
import About from "./components/layout/pages/About";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInfoCircle, faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import GithubState from './context/github/githubState';
import AlertState from './context/alert/AlertState';
import NotFound from "./components/layout/pages/NotFound";
library.add(faInfoCircle, faCheck, faTimesCircle );

const App = () => {

    return (
      <GithubState >
        <AlertState>
        <Router>
          <div className='App'>
            <Navbar />
            <div className='container'>
              <Alert />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About}/>
                <Route exact path='/user/:login' component={User}/>
                <Route component={NotFound} />
            </Switch>
            </div>
          </div>
        </Router> 
        </AlertState>
      </GithubState>
    );
};

export default App;
