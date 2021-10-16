import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import './App.css';
import Users from "./components/users/Users";
import axios from 'axios';
import Search from "./components/layout/Search";
import { Alert } from "./components/layout/Alert";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faInfoCircle, faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import About from "./components/layout/pages/About";
import User from "./components/users/User";
library.add(faInfoCircle, faCheck, faTimesCircle )

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: [],
  }

  searchUser = async text => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ users:  res.data.items, loading: false})
  }

  clearUsers = () => {
    this.setState({ users: [], loading: false })
  }

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => this.setState({ alert: null }), 3000)
  }

  getUser = async (userName) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${userName}?client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ user:  res.data, loading: false})
  }

  getUserRepos = async (userName) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ repos:  res.data, loading: false})
  }

  render() {
    const { repos, loading, users, user } = this.state;

    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <>
                    <Search searchUser={this.searchUser} 
                      clearUsers={this.clearUsers} 
                      showClear={this.state.users.length > 0}
                      setAlert={this.setAlert}
                    />
                    <Users loading={ loading } users={ users } />
                </>
              )} />
              <Route exact path='/about' component={About}/>
              <Route exact path='/user/:login' render={props => (
                <User { ...props } 
                  getUser={this.getUser} 
                  getUserRepos={this.getUserRepos} 
                  user={user} 
                  loading={loading}
                  repos={repos}
                  />
              )} />
          </Switch>
          

          </div>
        </div>
      </Router> 
    );
  }
};

export default App;
