import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types';

const GithubState = props => {
    const initialState = {
        users: [], 
        user: {},
        repos: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    //search Users
    const searchUsers = async text => {
        setLoading();
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
        ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
        ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        
        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        })
        
      }

    //Get User
    const getUser = async (userName) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${userName}?client_id=
        ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
        ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        
        dispatch({
            type: GET_USER,
            payload: res.data
        })
        
    }
    
    //Get User repos
    const getUserRepos = async (userName) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=
        ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
        ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
      }

    //Set Loading
    const setLoading = () => dispatch({type: SET_LOADING});

    //Clear users
    const clearUsers = () => dispatch({type: CLEAR_USERS});





    return <GithubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos,
        }}
    >
        {props.children}
    </GithubContext.Provider>
}

export default GithubState;



