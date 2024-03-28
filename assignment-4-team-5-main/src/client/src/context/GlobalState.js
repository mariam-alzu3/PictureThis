import React, { createContext, useReducer, useEffect } from "react";
import Axios from "axios";
import jwt_decode from "jwt-decode";


// initial state
const initialState = {
    watchlist: localStorage.getItem("watchlist")
        ? JSON.parse(localStorage.getItem("watchlist"))
        : [],
    watched: localStorage.getItem("watched")
        ? JSON.parse(localStorage.getItem("watched"))
        : [],
};

// create context
export const GlobalContext = createContext(initialState);

// provider components
export const GlobalProvider = (props) => {


    const username = ((sessionStorage.getItem('currentloggedin')));

    // actions
    const addMovieToWatchlist = (movie) => {
        Axios.post(`http://localhost:4200/watchlist/${username}`, {
            headers: {
                // "Content-type": "application/json",
                "x-access-token": localStorage.getItem("token")
            },
            username: username,
            movieID: movie.movieID,
            timesWatched: 0,
            toBeWatched: 1,
            isWatched: 0,
        }).then((response) => {
            console.log(response)

            if (response.status == 200) {
                alert(`${movie.title} has been added to your watchlist`)
            }
        });
    };

    const removeMovieFromWatchlist = (id) => {
    };

    const addMovieToWatched = (movie) => {

        Axios.post(`http://localhost:4200/history/${username}`, {
            headers: {
                // "Content-type": "application/json",
                "x-access-token": localStorage.getItem("token")
            },
            username: username,
            movieID: movie.movieID,
            timesWatched: 1,
            toBeWatched: 0,
            isWatched: 1,
        }).then((response) => {
            console.log(response)

            if (response.status == 200) {
                alert(`${movie.title} has been added to your movie list`)
            }
        });
    };

    return (
        <GlobalContext.Provider
            value={{
                addMovieToWatchlist,
                removeMovieFromWatchlist,
                addMovieToWatched,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
};