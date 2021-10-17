import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import './App.css';
import Users from "./components/users/Users";
import Search from "./components/layout/Search";
import User from "./components/users/User";
import Alert from "./components/layout/Alert";
import About from "./components/layout/pages/About";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInfoCircle, faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import GithubState from './context/github/GithubState';

library.add(faInfoCircle, faCheck, faTimesCircle )

const App = () => {
  const [alert, setAlert] = useState(null);

  const showAlert = (msg, type) => {
    setAlert({ msg, type });

    setTimeout(() => setAlert(null), 3000)
  }

    return (
      <GithubState >
        <Router>
          <div className='App'>
            <Navbar />
            <div className='container'>
              <Alert alert={alert} />
              <Switch>
                <Route exact path='/' render={props => (
                  <>
                      <Search  
                        showAlert={showAlert}
                      />
                      <Users />
                  </>
                )} />
                <Route exact path='/about' component={About}/>
                <Route exact path='/user/:login' component={User}/>
            </Switch>
            

            </div>
          </div>
        </Router> 
      </GithubState>
    );

};

export default App;
