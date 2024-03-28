import React from 'react';
import { useEffect, useState } from "react";
import {Link} from "react-router-dom"

const Stats = (props) => {
    const [stats, setStats] = useState('');
    const [genreStats, setGenreStats] = useState('');
    const [actorsStats, setActorStats] = useState('');

    const a=((sessionStorage.getItem("currentloggedin")));
    

    function generateTopMovie() {
        var username = a;
        const getStats = async () => {
          const response = await fetch(`http://localhost:4200/statistics/${username}`);
          const json = await response.json();
          if (response.ok) {
            setStats(json[0]);
          }
        };
        getStats();
      }

      generateTopMovie();

      function generateTopGenre() {
        var username = a
        const getGenreStats = async () => {
          const response = await fetch(`http://localhost:4200/statistics/genres/${username}`);
          const json = await response.json();
          if (response.ok) {
            setGenreStats(json[0]);
          }
        };
        getGenreStats();
      }

      generateTopGenre();

      function generateTopActor() {
        var username = a
        const getActorStats = async () => {
          const response = await fetch(`http://localhost:4200/statistics/actors/${username}`);
          const json = await response.json();
          if (response.ok) {
            setActorStats(json[0]);
          }
        };
        getActorStats();
      }

      generateTopActor();

      return (
        <div>
          <div id='stats'>
            <h1>{a}'s PictureThis Stats</h1>
            <div className="small-box">
            <h2> {stats.username}'s Most Watched Movie is: <em>{stats.title}</em></h2>
            <h2> You watched {stats.title} {stats.timesWatched} times</h2>
            </div>
            <div className="small-box">
            <h2> {genreStats.username}'s Top Genre is: <em>{genreStats.topGenre}</em></h2>
            <h2>{genreStats.topGenre} appears in your movie list {genreStats.appearances} times</h2>
            </div>
            <div className="small-box">
            <h2> {actorsStats.username}'s Top Actor is: <em>{actorsStats.topActor}</em></h2>
            <h2>{actorsStats.topActor} appears in your movie list {actorsStats.appearances} times</h2>
            </div>
          </div>
        </div>
    )

}

export default Stats;