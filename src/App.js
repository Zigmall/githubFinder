import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import './App.css';
import Users from "./components/users/Users";
import axios from 'axios';
import Search from "./components/layout/Search";


class App extends Component {
  state = {
    users: [],
    loading: false
  }
  async componentDidMount() {

    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users?client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ users:  res.data, loading: false})
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


  render() {
    const { loading, users } = this.state;
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Search searchUser={this.searchUser} clearUsers={this.clearUsers} showClear={ this.state.users.length > 0 }/>
          <Users loading={ loading } users={ users } />

        </div>
      </div>
    );
  }
};

export default App;
