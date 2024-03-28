import { useEffect, useState } from "react";
function Recommendations() {
  const [tMovieRec, setTMoveRecs] = useState("");
  const [tMovieRec2, setTMoveRecs2] = useState("");
  const [tMovieRec3, setTMoveRecs3] = useState("");
  const a = sessionStorage.getItem("currentloggedin");

  function generateTopMovieRecs() {
    var username = a;
    const getTopMovieR = async () => {
      const response = await fetch(
        `http://localhost:4200/recommendations/${username}`
      );
      const json = await response.json();
      if (response.ok) {
        setTMoveRecs(json);
      }
      // alert(tMovieRec);
      // alert(tMovieRec[0].title)
      let topCastID = tMovieRec[0].castID1;
      let topGenreID = tMovieRec[0].genreID1;
      let movie = tMovieRec[0].movieID;

      fetchDetails(topGenreID, topCastID, movie);
      //getDetails(topGenreID, topCastID);
    };

    async function fetchDetails(topGenreID, topCastID, movie) {
      //   alert(topCastID + " " + topGenreID);
      const response2 = await fetch(
        `http://localhost:4200/recommendations/${topGenreID}/${topCastID}/${movie}`
      );
      const json2 = await response2.json();
      if (response2.ok) {
        setTMoveRecs2(json2);
      }
      //console.log(tMovieRec2);
      //   alert(JSON.stringify(tMovieRec2));
    }
    getTopMovieR();

    // async function getDetails(genre, cast) {
    //   const response3 = await fetch(
    //     `http://localhost:4200/recommendation/details/${genre}/${cast}`
    //   );
    //   const json3 = await response3.json();
    //   if (response3.ok) {
    //     setTMoveRecs3(json3[0]);
    //     alert(json3[0]);
    //   }
    // }
  }

  generateTopMovieRecs();

  return (
    <div>
      <div className="recommendations">
        <h2>Recommendations</h2>
        <div>
          {tMovieRec && tMovieRec.map((movie => {
            return [
              <div>
              <h4>Based on your Most Watched Movie: {movie.title}</h4>
              <h5>See below movies in the same genre with the same lead:</h5>
              </div>
            ]
          }))

          }

        </div>
      </div>
      <div id="movie-results">
        {tMovieRec2 &&
          tMovieRec2.map((movie) => {
            return [
              <ul className="title-box" key={movie.movieID}>
                <li>
                  <h3>{movie.title}</h3>
                  <h5>Genre: {movie.genreName}</h5>
                  <h5>Cast Member: {movie.castName}</h5>
                </li>
              </ul>,
            ];
          })}
      </div>
    </div>
  );
}
export default Recommendations;
