import React from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { ResultCard } from "./ResultCard";


function WatchList() {

    const [results, setResults] = useState("");
    const username = ((sessionStorage.getItem('currentloggedin')));

    const getWatchlist = async () => {
        var movieResults = document.getElementById("movie-results");
        const response = await fetch(`http://localhost:4200/watchlist/${username}`);
        const json = await response.json();
        if (response.ok) {
            setResults(json);
        }
        console.log(results)
    };
    getWatchlist();


    return (
        <div>
            <h1>{username}'s Watch List</h1>
            {results && results.map((movie) => {
                return ([
                    <ul className="box" key={movie.movieID}>
                        <li>
                            {/* <h2>{movie.title}</h2>
                            <button onClick={(e) => { historylist() }}>HistoryList</button>
                            <button onClick={(e) => { watchlist() }}> WatchList</button>
                            <p>Release Year: {movie.releaseYear}<br></br></p>
                            <p>Length: {movie.runningTime} minutes<br></br></p>
                            <h4>Cast Members:<br></br></h4>
                            <span>{movie.cast1}<br></br></span>
                            <span>{movie.cast2}<br></br></span>
                            <span>{movie.cast4}<br></br></span>
                            <h4>Director:<br></br></h4>
                            <span>{movie.director}<br></br></span>
                            <h4>Genres:<br></br></h4>
                            <span>{movie.genre1}<br></br></span>
                            <span>{movie.genre2}<br></br></span>
                            <span>{movie.genre3}<br></br></span>
                            <span>{movie.movieID}<br></br></span> */}
                        </li>
                        <ResultCard movie={movie} />
                    </ul>,
                ]);
            })}
        </div>
    )
}

export default WatchList;