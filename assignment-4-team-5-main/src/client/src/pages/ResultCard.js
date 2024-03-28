import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState.js";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";


export const ResultCard = ({ movie }) => {

    const a = ((sessionStorage.getItem("currentloggedin")));

    const navigate = useNavigate();
    const [showScore, setShowScore] = useState(false);
    const {
        addMovieToWatchlist,
        addMovieToWatched,
        watchlist,
        watched,
        review,
    } = useContext(GlobalContext); 



    const addReview = async (movie) => {
        setShowScore(true);
        setMovieID(movie.movieID);
  
    };

    const close = () => {
        setShowScore(false);
    }
    const [reviewbody, setReviewbody] = useState(null);
    const [ratingbody, setRatingbody] = useState(null);
    const [movieIDPost, setMovieID] = useState(0);
    
    //to make the date for the current day
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    let postMovieID = 0;

    const post = () => {
        var reviewFlag = 0;
        if (reviewbody != "") {
            reviewFlag = 1;
        } else if (reviewbody == "") {
            reviewFlag = 0;
            setReviewbody(null);
        }

        var ratingFlag = 0;
        if (ratingbody != 0) {
            ratingFlag = 1;
        } else if (reviewbody == 0) {
            ratingFlag = 0;
            setRatingbody(null);
        }

        //getting movie ID first
        const fetchname = async () => {
            //const response = await fetch(
              //`http://localhost:4200/browse/${movieIDPost}`
            //);
            //const json = await response.json();
           // if (response.ok) {

                //calling post method to post review
                Axios.post("http://localhost:4200/post", {
                    username: a,
                    movieIDPost: movieIDPost,
                    reviewbody: reviewbody,
                    ratingbody: ratingbody,
                    postDate: today,
                    reviewFlag: reviewFlag,
                    ratingFlag: ratingFlag,
                }).then((response) => {
                    //console.log(response);
                    console.log(response)
                    alert('Your Review has been posted')
                });
           // }
      
        };
        if (ratingFlag == 0 && reviewFlag == 0) {
            alert("You need to have either a review or a rating")
        }
        else {
            fetchname();
        }
    }
            
    const [poster, setPoster] = useState('');
    const [posterNA, setPosterNA] = useState('');

    async function api() {
        const result = await fetch(`https://omdbapi.com/?s=${movie.title.toLowerCase()}&page=1&apikey=d4bb24bc`);
        const movieDetails = await result.json();
        //console.log(movieDetails)
        console.log(movieDetails.Response)
        //console.log(movieDetails.Search[0].Poster)

        const topMovie = movieDetails.Search[0]
        if (topMovie) {
            setPoster(movieDetails.Search[0].Poster)
        } 
        else {
            setPoster("client/src/pages/image_not_found.jpg")
        }
    }
    api();

    const [reviews, setReviews] = useState("");
    function generateMovieReviews(movie) {
        const getReviews = async () => {
          const response = await fetch(`http://localhost:4200/reviews/${movie.movieID}`);
          const json = await response.json();
          if (response.ok) {
            setReviews(json);
          }
        };
        getReviews();

      }    

    const handleClick = event => {
        addMovieToWatchlist(movie)
        event.currentTarget.disabled = true;
        console.log('button clicked');
    };


      generateMovieReviews(movie)



    return (
        <div className="result-card">
            {showScore ? (
                        <div className='app'>
                <button onClick={close} class="close">X</button>
                            <div className='app'>
                            <h1>Movie: </h1>
                            <p>{movie.title}</p>
                            <h1>Review</h1>
                            <div>
                                <input
                                className="search-input"
                                type="text"
                                id="review-body"
                                placeholder="Insert your review..."
                                maxLength="250"
                                onChange={(e) => { setReviewbody(e.target.value) }}
                                ></input>
                                <br></br> Rating (0-5)
                                <input
                                className="search-input"
                                type="range"
                                id="rating-body"
                                min="0" max="5"
                                placeholder="Insert your star rating..."
                                maxLength="5"
                                onChange={(e) => { setRatingbody(e.target.value) }}
                                ></input>
                        <p class="smallText">move this slider if you want to submit a rating</p>
                                <br></br>
                                <button onClick={post}>Post</button>
                                </div>
                            </div>
                        </div>
        ) : (
                            <div className="info">
                <div id="result-grid" >
                    <h2 className="title">{movie.title}</h2>
                    {/* <img src={poster}/>  */}

                    {poster ? (
                        <img 
                    src={poster} 
                    /> 
                    ) : (
                        <div className="filler-poster" />
                    )
                }

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
                    {/* <span>{movie.movieID}<br></br></span> */}

                </div>
                <div id="reviews">
                    {reviews && reviews.map((review) => {
                        return (
                                <div className="review-box">
                                    {review.reviewBody} <br></br> by {review.username} <br></br> ({review.starRating}/5 Stars)
                                </div>
                            )
                        })
                        }
                </div>
                <div className="controls">
                    <button
                        className="btn"
                        // onClick={() => addMovieToWatchlist(movie)}
                        onClick={handleClick}
                    >
                        Add to Watchlist
                    </button>
                    <button
                        className="btn"
                        onClick={() => addMovieToWatched(movie)}
                    >
                        Add to Watched
                    </button>
                    <button
                        className="btn"
                        onClick={() => addReview(movie)}
                    >
                        Review Movie
                    </button>
                    {/* <button
                        className="btn"
                        onClick={() => generateMovieReviews(movie)}
                    >
                        View Reviews
                    </button> */}
                </div>
            </div>
            )}
    </div >
    );
};