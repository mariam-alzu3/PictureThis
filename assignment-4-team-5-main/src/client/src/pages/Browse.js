import { useEffect, useState } from "react";
import { ResultCard } from "./ResultCard";


const Browse = () => {
  const [results, setResults] = useState("");
  const [genres, setGenres] = useState("");
  const [byGenres, setbyGenres] = useState("");
  const [byYears, setbyYears] = useState("");

  function clear(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild)
    }
  }

  function search() {
    var searchTerm = document.getElementById("search-input");
    //     var movieResults = document.getElementById("movie-results");
    //    clear(movieResults)

    // console.log(searchTerm);
    const fetchname = async () => {
      const response = await fetch(
        `http://localhost:4200/browse/${searchTerm.value}`
      );
      const json = await response.json();
      if (response.ok) {
        setResults(json);
      }

    };
    fetchname();


  }

  function populate() {
    const getGenres = async () => {
      var movieResults = document.getElementById("movie-results");
      var yearSortResults = document.getElementById("year-sort-results");
      clear(movieResults)
      clear(yearSortResults)
      const response = await fetch(`http://localhost:4200/genres`);
      const json = await response.json();
      if (response.ok) {
        setGenres(json);
      }
      // console.log(genres)
    };
    getGenres();
  }

  function getGenreSort() {
    var movieResults = document.getElementById("movie-results");
    var yearSortResults = document.getElementById("year-sort-results");
    clear(movieResults)
    clear(yearSortResults)
    var searchTerm = document.getElementById("search-input");
    var genreSelected = document.getElementById("genre");
    alert("Sorting by: " + genreSelected.value);
    const fetchgenre = async () => {
      const response = await fetch(
        `http://localhost:4200/filter/genre/${searchTerm.value}/${genreSelected.value}`
      );
      const json = await response.json();
      setbyGenres(json);
    };
    fetchgenre();
  }

  function getYearSort(){
    var movieResults = document.getElementById("movie-results");
    var yearSortResults = document.getElementById("year-sort-results");
    var searchTerm = document.getElementById("search-input");
    clear(movieResults)
    clear(yearSortResults);
    var yearSelected = document.getElementById("year");
    alert("Sorting by: " + yearSelected.value);
    const fetchYear = async () => {
      const response = await fetch(
        `http://localhost:4200/filter/${searchTerm.value}/${yearSelected.value}`
      );
      const json = await response.json();
      setbyYears(json);
    };
    fetchYear();
  }

  function watchlist() {
    var wantWatch = window.confirm("Add movie to watchlist")

    if (wantWatch == true) {
      console.log(results)
    }
  }

  function historylist() {
    var watched = window.confirm("Add to movie to history")

    if (watched == true) {
      console.log()
    }
  }

  return (
    <div>
      <h1>Browse</h1>
      <div className="headerB">
        <input
          className="search-input"
          type="text"
          id="search-input"
          placeholder="Search by title..."
          maxLength="25"
          onChange={(e) => {
            search();
          }}
          onClick={populate}
        ></input>
        {/* <button
          onClick={(e) => {
            search();
          }}
        >
          Search
        </button> */}
        <div className="filter">
          <p>Release Year</p>
          <select id="year">
            <option value={"all"}>All</option>
            {results &&
              results.map((movie) => {
                return <option value={movie.releaseYear}>{movie.releaseYear}</option>;
              })}
          </select>
        </div>
        <button id="submitYear" onClick={(e) => {
          getYearSort();
        }}>Submit</button>
        <div className="filter">
          <p>Genre</p>
          <select id="genre" >
            <option value={"all"}>All</option>
            {genres &&
              genres.map((m) => {
                return <option value={m.genreName}>{m.genreName}</option>;
              })}
          </select>
        </div>
        {/* <div className="filter">
          <p>Cast Members</p>
          <select name="Cast">
            <option value={"all"}>All</option>
            {results &&
              results.map((movie) => {
                return <option value={"any"}>{movie.cast1}</option>;
              })} */}
            {/* {results &&
              results.map((movie) => {
                return (
                    <option value={"any"}>{movie.cast2}</option>
                );
              })}
              {results &&
              results.map((movie) => {
                return (
                    <option value={"any"}>{movie.cast4}</option>
                );
              })} */}
          {/* </select>
        </div> */}
        {/* <div className="filter">
          <p>Director</p>
          <select name="Cast">
            <option value={"all"}>All</option>
            {results &&
              results.map((movie) => {
                return <option value={movie.director}>{movie.director}</option>;
              })}
          </select>
        </div> */}
        <button id="submit" onClick={(e) => {
          getGenreSort();
        }}>Submit</button>
      </div>
      <div id="movie-results">
        {byGenres && byGenres.map((movie) => {
          return ([
            <ul className="box" key={movie.movieID}>
              <li>
                <h2>{movie.title}</h2>
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
              </li>
            </ul>,
          ]);
        })}
      </div>
      <div id="year-sort-results">
        {byYears && byYears.map((movie) => {
          return ([
            <ul className="box" key={movie.movieID}>
              <li>
                <h2>{movie.title}</h2>
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
              </li>
            </ul>,
          ]);
        })}
      </div>
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
  );
};

export default Browse;
