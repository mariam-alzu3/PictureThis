import React from 'react';
import Stats from "./Stats";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { ResultCard } from "./ResultCard";


function Dashboard() {

    const navigate = useNavigate();
    const [history, setHistory] = useState("");
    const username = ((sessionStorage.getItem('currentloggedin')));


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = jwt_decode(token);
            console.log(user);
            if (!user) {
                localStorage.removeItem("token");
                navigate("/login", { replace: true });
            }
        }
        // eslint-disable-next-line
    }, []);



    const getHistory = async () => {
        var movieResults = document.getElementById("movie-results");
        const response = await fetch(`http://localhost:4200/historylist/${username}`);
        const json = await response.json();
        if (response.ok) {
            setHistory(json);
        }
        console.log(history)
    };
    getHistory();


    return (
        <div>
            <div className="container">
                <div className="inner-content">
                    {/* <div className="brand">
                        <Link to="/">WatchList</Link>
                    </div> */}

                    <ul className="nav-links">
                        <li>
                            <Link to="/watchlist" className='link'>Watch List</Link>
                        </li>
                        <li>
                            <Link to="/stats" className='link'>Stats</Link>
                        </li>
                    </ul>
                </div>
            </div>
                <h1>{username}'s History</h1>
            {history && history.map((movie) => {
                return ([
                    <ul className="box" key={movie.movieID}>
                        <li>
                            {/* <h2>{movie.title}</h2>
                            <p>No. of Times Watched: {movie.timesWatched}<br></br></p>
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

export default Dashboard;