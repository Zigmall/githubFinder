import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import './App.css';
import Users from "./components/users/Users";
import axios from 'axios';
import Search from "./components/layout/Search";
import User from "./components/users/User";
import Alert from "./components/layout/Alert";
import About from "./components/layout/pages/About";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInfoCircle, faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import GithubState from './context/github/GithubState';

library.add(faInfoCircle, faCheck, faTimesCircle )

const App = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [repos, setRepos] = useState([]);

  const showAlert = (msg, type) => {
    setAlert({ msg, type });

    setTimeout(() => setAlert(null), 3000)
  }


  const getUserRepos = async (userName) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setRepos(res.data);
    setLoading(false);
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
                <Route exact path='/user/:login' render={props => (
                  <User { ...props } 
                    getUserRepos={getUserRepos} 
                    repos={repos}
                    />
                )} />
            </Switch>
            

            </div>
          </div>
        </Router> 
      </GithubState>
    );

};

export default App;
