const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require('cors')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' })

app.use(cors())
app.use(express.json());
const { env } = require('process');
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: process.env.MY_PASSWORD,
    database: "picturethis",
    multipleStatements: true
})

// db.connect(function(err) {
//     if (err) {
//       console.error('error connecting: ' + err.stack);
//       return;
//     }
//    console.log('connected as id ' + db.threadId);
//   });

app.get('/', (req, res) => {
    const sqlInsert = "SELECT genreName FROM Genre";
    db.query(sqlInsert, (err, result) => {
        res.send(result)
    })
})

// to view all search results of a movie
app.get('/browse/:movieName', (req, res) => {
    const searchTerm = req.params.movieName;
    const sqlSearchView =
        // `CREATE VIEW ${searchTerm}View AS ` +
        `SELECT movie.movieID, movie.title, c.castName AS cast1, c1.castName AS cast2, c4.castName AS cast4, c6.castName AS director,movie.releaseYear, movie.runningTime, g.genreName AS genre1, g2.genreName AS genre2, g3.genreName AS genre3
        FROM moviecast
        JOIN castmember c on 
        (moviecast.castID1 = c.castID) 
        JOIN castmember c1 on 
        (moviecast.castID2 = c1.castID)
        JOIN castmember c2 on 
        (moviecast.castID3 = c2.castID)
        JOIN castmember c4 on 
        (moviecast.castID5 = c4.castID)
        JOIN castmember c6 on 
        (moviecast.castID6 = c6.castID)
        LEFT JOIN movie ON moviecast.movieId = movie.movieId  
        LEFT JOIN moviegenre mg ON (mg.movieID = movie.movieID)
        JOIN genre g on (mg.genreID1 = g.genreID)
        JOIN genre g2 on (mg.genreID2 = g2.genreID)
        JOIN genre g3 on (mg.genreID2 = g3.genreID)
        WHERE title LIKE '%${searchTerm}%';`

    // const sqlView = `SELECT * FROM ${searchTerm}View;`
    db.query(sqlSearchView, (err, result) => {
        res.send(result.splice(0, 20))
    })
    // db.query(sqlView, (err, result)=>{
    //     console.log(err)
    //     res.send(result)
    // })
})

//to get quiz results
//random comedy movie if user is sad
app.get('/quiz/happy/:random', (req, res) => {
    const searchTerm = req.params.random;
    const sqlSearchView =
        `SELECT movie.movieID, movie.title,movie.releaseYear, movie.runningTime, g.genreName
        FROM movie
        JOIN moviegenre mg on (movie.movieID = mg.movieID)
        JOIN genre g on (g.genreID = mg.genreID1)
        WHERE g.genreName ='Comedy';`

    db.query(sqlSearchView, (err, result) => {
        result = result.splice(searchTerm, searchTerm-(searchTerm-1));
        res.send(result)
        console.log(result)
    })
})

//random familt movie if user is neutral
app.get('/quiz/family/:random', (req, res) => {
    const searchTerm = req.params.random;
    const sqlSearchView =
        `SELECT movie.movieID, movie.title,movie.releaseYear, movie.runningTime, g.genreName
        FROM movie
        JOIN moviegenre mg on (movie.movieID = mg.movieID)
        JOIN genre g on (g.genreID = mg.genreID1)
        WHERE g.genreName ='Family';`

    db.query(sqlSearchView, (err, result) => {
        result = result.splice(searchTerm, searchTerm-(searchTerm-1));
        res.send(result)
        console.log(result)
    })
})

//random drama movie if user is happy
app.get('/quiz/drama/:random', (req, res) => {
    const searchTerm = req.params.random;
    const sqlSearchView =
        `SELECT movie.movieID, movie.title,movie.releaseYear, movie.runningTime, g.genreName
        FROM movie
        JOIN moviegenre mg on (movie.movieID = mg.movieID)
        JOIN genre g on (g.genreID = mg.genreID1)
        WHERE g.genreName ='Drama';`

    db.query(sqlSearchView, (err, result) => {
        result = result.splice(searchTerm, searchTerm-(searchTerm-1));
        res.send(result)
        console.log(result)
    })
})

// to view all search results of a movie
app.get('/filter/genre/:movieName/:genre', (req, res) => {
    const searchTerm = req.params.movieName;
    const genre = req.params.genre;
    const sqlSearchView =
        //  `CREATE VIEW ${searchTerm}View AS ` +
        `SELECT movie.title, c.castName AS cast1, c1.castName AS cast2, c4.castName AS cast4, c6.castName AS director,movie.releaseYear, movie.runningTime, g.genreName AS genre1, g2.genreName AS genre2, g3.genreName AS genre3
        FROM moviecast
        JOIN castmember c on 
        (moviecast.castID1 = c.castID) 
        JOIN castmember c1 on 
        (moviecast.castID2 = c1.castID)
        JOIN castmember c2 on 
        (moviecast.castID3 = c2.castID)
        JOIN castmember c4 on 
        (moviecast.castID5 = c4.castID)
        JOIN castmember c6 on 
        (moviecast.castID6 = c6.castID)
        LEFT JOIN movie ON moviecast.movieId = movie.movieId  
        LEFT JOIN moviegenre mg ON (mg.movieID = movie.movieID)
        JOIN genre g on (mg.genreID1 = g.genreID)
        JOIN genre g2 on (mg.genreID2 = g2.genreID)
        JOIN genre g3 on (mg.genreID2 = g3.genreID)
        WHERE title LIKE '%${searchTerm}%' AND (g.genreName LIKE '%${genre}%' OR g2.genreName LIKE '%${genre}%' OR g3.genreName LIKE '%${genre}%');`
    db.query(sqlSearchView, (err, result) => {
        res.send(result.splice(0, 20))
    })
})

app.get('/filter/:movieName/:year', (req, res) => {
    const searchTerm = req.params.movieName;
//    console.log(req.params);
    const year = req.params.year;
    const sqlSearchView =
        //  `CREATE VIEW ${searchTerm}View AS ` +
        `SELECT movie.title, c.castName AS cast1, c1.castName AS cast2, c4.castName AS cast4, c6.castName AS director,movie.releaseYear, movie.runningTime, g.genreName AS genre1, g2.genreName AS genre2, g3.genreName AS genre3
        FROM moviecast
        JOIN castmember c on 
        (moviecast.castID1 = c.castID) 
        JOIN castmember c1 on 
        (moviecast.castID2 = c1.castID)
        JOIN castmember c2 on 
        (moviecast.castID3 = c2.castID)
        JOIN castmember c4 on 
        (moviecast.castID5 = c4.castID)
        JOIN castmember c6 on 
        (moviecast.castID6 = c6.castID)
        LEFT JOIN movie ON moviecast.movieId = movie.movieId  
        LEFT JOIN moviegenre mg ON (mg.movieID = movie.movieID)
        JOIN genre g on (mg.genreID1 = g.genreID)
        JOIN genre g2 on (mg.genreID2 = g2.genreID)
        JOIN genre g3 on (mg.genreID2 = g3.genreID)
        WHERE title LIKE '%${searchTerm}%' AND movie.releaseYear LIKE '%${year}%';`
    db.query(sqlSearchView, (err, result) => {
        res.send(result)
        //console.log(err)
    })
})

// to view all search results of a movie
app.get('/genres', (req, res) => {
    const sqlSearchView =
        `SELECT genreName 
    FROM picturethis.genre;`
    db.query(sqlSearchView, (err, result) => {
        res.send(result)
    })
})

app.post("/register", (req, res) => {
    const username = req.body.username
    const fName = req.body.fname
    const lName = req.body.lname
    const email = req.body.email
    const dateOfBirth = req.body.dateOB
    const gender = req.body.gender
    const creationDate = req.body.creationDate
    const accountPassword = req.body.password

    let query_1 = `INSERT INTO ptuser (username, fName, lName, email, dateOfBirth, gender, creationDate) VALUES (?,?,?,?,?,?,?);`;
    let query_2 = `INSERT INTO ptaccount (username, accountPassword) VALUES (?,?)`;

    db.query(
        query_1 + query_2,
        [username, fName, lName, email, dateOfBirth, gender, creationDate, username, accountPassword],
        (err, results, fields) => {
            if (err) throw err;
            // results is an array with one element for every statement in the query:
            //console.log(results[0]); // query_1 results
            //console.log(results[1]); // query_2 results
            res.send(results);
        });
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const accountPassword = req.body.password;

    db.query(
        "SELECT * FROM ptaccount WHERE username = ? AND accountPassword = ?",
        [username, accountPassword],
        (err, result) => {
            if (err) {
                //console.log(err);
                res.send({ err: err });
            }

            if (result.length > 0) {
                //console.log(result[0].username)
                //res.send(result);

                const id = result[0].id

                const token = jwt.sign({
                    //id
                    username: result[0].username
                }, "jwtSecret"
                )
                //return res.json({ auth: true, token: token, result: result })
                return res.json({ auth: true, status: "ok", user: token, result: result })

            } else {
                //res.json({ auth: false, message: "Wrong username or password" })
                //res.json({ message: "Wrong username or password!" , result: false });
                res.json({ auth: false, status: 'error', user: false })

            }
        }
    )
})

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-acess-token"]

    if (!token) {
        res.send("Token unavailable!")
    } else {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: "Authentication failed." })
            } else {
                req.userId = decoded.id;
            }
        })
    }
}

app.get('/isUserAuth', verifyJWT, (req, res) => {
    res.send("You are authenticated")
})


app.post("/watchlist/:username", (req, res) => {

    const token = req.headers['x-access-token']
    //console.log(token)

    try {
        // const decoded = jwt.verify(token, 'jwtSecret')
        // console.log(decoded)
        // const username = decoded.username

        const username = req.params.username
        const movieID = req.body.movieID
        const timesWatched = req.body.timesWatched
        const toBeWatched = req.body.toBeWatched
        const isWatched = req.body.isWatched


        let query_1 = `INSERT INTO Movielist(movieID, username, timesWatched, toBeWatched, isWatched) VALUES (?,?,?,?,?);`;

        db.query(
            query_1,
            [movieID, username, timesWatched, toBeWatched, isWatched],
            (err, results, fields) => {
                if (err) throw err;
                // results is an array with one element for every statement in the query:
                //console.log(results[0]); // query_1 results
                res.send(results);
            });

    } catch (error) {
        //console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }
});


app.post("/history/:username", (req, res) => {
    const token = req.headers['x-access-token']
    //console.log(token)

    try {
        // const decoded = jwt.verify(token, 'jwtSecret')
        // console.log(decoded)
        // const username = decoded.username

        const username = req.params.username
        const movieID = req.body.movieID
        const timesWatched = req.body.timesWatched
        const toBeWatched = req.body.toBeWatched
        const isWatched = req.body.isWatched


        let query_1 = `INSERT INTO Movielist(movieID, username, timesWatched, toBeWatched, isWatched) VALUES (?,?,?,?,?) ON DUPLICATE KEY UPDATE 
        timesWatched  = timesWatched + 1,
        toBeWatched = false,
        isWatched = true;`;

        db.query(
            query_1,
            [movieID, username, timesWatched, toBeWatched, isWatched],
            (err, results, fields) => {
                if (err) throw err;
                // results is an array with one element for every statement in the query:
                //console.log(results[0]); // query_1 results
                res.send(results);
            });

    } catch (error) {
        //console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }
});


app.get('/historylist/:username', (req, res) => {
    const username = req.params.username

   const sqlSearchView =
        `SELECT movie.title, c.castName AS cast1, c1.castName AS cast2, c4.castName AS cast4, c6.castName AS director,movie.releaseYear, movie.runningTime, g.genreName AS genre1, g2.genreName AS genre2, g3.genreName AS genre3, ml.timesWatched, ml.username
        FROM moviecast
        JOIN castmember c on 
        (moviecast.castID1 = c.castID) 
        JOIN castmember c1 on 
        (moviecast.castID2 = c1.castID)
        JOIN castmember c2 on 
        (moviecast.castID3 = c2.castID)
        JOIN castmember c4 on 
        (moviecast.castID5 = c4.castID)
        JOIN castmember c6 on 
        (moviecast.castID6 = c6.castID)
        LEFT JOIN movie ON moviecast.movieId = movie.movieId  
        LEFT JOIN moviegenre mg ON (mg.movieID = movie.movieID)
        JOIN genre g on (mg.genreID1 = g.genreID)
        JOIN genre g2 on (mg.genreID2 = g2.genreID)
        JOIN genre g3 on (mg.genreID2 = g3.genreID)
        LEFT JOIN movielist ml ON (movie.movieID = ml.movieID)
        WHERE ml.username = '${username}' AND ml.toBeWatched = false;`;


    db.query(sqlSearchView, (err, result) => {
        // if(err){
        //console.log("ERROR" + err);
        // }
        res.send(result || err);

    })
})


app.get('/watchlist/:username', (req, res) => {
    const username = req.params.username

//     const sqlSearchView =
//         `SELECT * 
//    FROM movielist ml, movie m
//    WHERE username = '${username}' AND m.movieID = ml.movieID AND ml.toBeWatched = true ;`
   
   const sqlSearchView =
        `SELECT movie.title, c.castName AS cast1, c1.castName AS cast2, c4.castName AS cast4, c6.castName AS director,movie.releaseYear, movie.runningTime, g.genreName AS genre1, g2.genreName AS genre2, g3.genreName AS genre3, ml.timesWatched, ml.username
        FROM moviecast
        JOIN castmember c on 
        (moviecast.castID1 = c.castID) 
        JOIN castmember c1 on 
        (moviecast.castID2 = c1.castID)
        JOIN castmember c2 on 
        (moviecast.castID3 = c2.castID)
        JOIN castmember c4 on 
        (moviecast.castID5 = c4.castID)
        JOIN castmember c6 on 
        (moviecast.castID6 = c6.castID)
        LEFT JOIN movie ON moviecast.movieId = movie.movieId  
        LEFT JOIN moviegenre mg ON (mg.movieID = movie.movieID)
        JOIN genre g on (mg.genreID1 = g.genreID)
        JOIN genre g2 on (mg.genreID2 = g2.genreID)
        JOIN genre g3 on (mg.genreID2 = g3.genreID)
        LEFT JOIN movielist ml ON (movie.movieID = ml.movieID)
        WHERE ml.username = '${username}' AND ml.toBeWatched = true;`;

    db.query(sqlSearchView, (err, result) => {
        // if(err){
        //console.log("ERROR" + err);
        // }
        res.send(result || err);

    })
})


app.get('/browse/filter/genres/:genre', (req, res) => {
    const searchTerm = req.params.genre;
    const sqlSearchView =
        `SELECT * FROM movies 
        WHERE genre1 LIKE '%${searchTerm}%';`
    db.query(sqlSearchView, (err, result) => {
        res.send(result)
    })
})

//recommendations
app.get('/recommendations/:username', (req, res) => {//get 
    const searchMovie = req.params.movie;
    const searchUser = req.params.username;
    const sqlSearchView = 
    `SELECT m.title,m.movieID, ml.timesWatched, ml.username, mc.castID1, mg.genreID1
    FROM movielist ml, movie m, moviecast mc, moviegenre mg
    WHERE ml.timesWatched = (
    SELECT MAX(ml.timesWatched)
        FROM movielist ml
        WHERE ml.timesWatched > 0 
        AND ml.username = '${searchUser}'
    )
    AND ml.movieID = m.movieID  AND ml.timesWatched > 0 AND mc.movieID=m.movieID AND username ='${searchUser}'
    GROUP BY ml.movieID
    ORDER BY m.title  DESC
    LIMIT 1;`
    db.query(sqlSearchView, (err, result) => {
        res.send(result);
    })
})

app.get('/recommendations/:genre/:cast/:movie', (req, res) => {
     const searchCast = req.params.cast;
    const searchGenre = req.params.genre;
    const movie = req.params.movie
    //console.log(searchCast)
    //console.log(searchGenre)
    const sqlSearchView = 
    `SELECT m.title, m.movieID, mc.castID1, mg.genreID1, g.genreName, c.castName
    FROM movie m, moviecast mc, moviegenre mg, genre g, castMember c
    WHERE mc.movieID = m.movieID AND g.genreID=${searchGenre} AND mc.castID1=${searchCast} AND mg.genreID1 = g.genreID AND mc.castID1 = c.castID AND m.movieID != ${movie}
    GROUP BY m.title
    LIMIT 3;`
    db.query(sqlSearchView, (err, result) => {
        // if(err){
       // console.log("ERROR" + err);
        // }
        res.send(result || err);
       
    })
})
// app.get('/recommendations/details/:genre/:cast', (req, res) => {//get 
//     const searchCast = req.params.cast;
//     const searchGenre = req.params.genre;
//     const query1 = 
//     `SELECT genreName 
//     FROM genre
//     WHERE genreID = ${searchGenre};`
//     const query2 = 
//     `SELECT castName 
//     FROM castmember
//     WHERE castID= ${searchCast}`
//     db.query(
//         query1 + query2,
//         [searchCast, searchGenre],
//         (err, results, fields) => {
//             if (err) throw err;
//             // results is an array with one element for every statement in the query:
//             //console.log(results[0]); // query_1 results
//             //console.log(results[1]); // query_2 results
//             res.send(results);
//         });
// })

app.get('/recommendations/:movie', (req, res) => {//get 
    const searchMovie = req.params.movie;
    const sqlSearchView = 
    `SELECT m.title,m.movieID, ml.username, mc.castID1, mg.genreID1
    FROM movielist ml, movie m, moviecast mc, moviegenre mg
    WHERE m.title LIKE "%${searchMovie}%" AND mc.movieID=m.movieID
    GROUP BY m.title;`
    db.query(sqlSearchView, (err, result) => {
        res.send(result);
    })
})

// to get a user's genre statitics
app.get('/statistics/genres/:username',(req,res) => {
    const username = req.params.username;
    const sqlStatistic = `SELECT ml.username,g.genreName AS topGenre, COUNT(mg.genreID1) AS appearances
    FROM movielist ml, movie m
    JOIN moviegenre mg ON mg.movieID = m.movieID 
    JOIN genre g ON mg.genreID1 = g.genreID
    WHERE ml.movieID = m.movieID AND ml.username = '${username}' 
    GROUP BY mg.genreID1
    ORDER BY COUNT(mg.genreID1) DESC
	LIMIT 1`
    db.query(sqlStatistic, (err, result) => {
        res.send(result)
    })
})

// to get a user's statitics
app.get('/statistics/:username',(req,res) => {
    const username = req.params.username;
    const sqlStatistic = `SELECT m.title, ml.username, ml.movieID, ml.timesWatched, g.genreName as genre, c.castName as actor, m.releaseYear, m.runningTime
        FROM movielist ml, movie m
        LEFT JOIN moviegenre mg ON (mg.movieID = m.movieID)
        JOIN genre g on (mg.genreID1 = g.genreID)
        LEFT JOIN moviecast mc ON (mc.movieID = m.movieID)
        JOIN castmember c on (mc.castID1 = c.castID) 
        WHERE ml.timesWatched = 
		(SELECT MAX(ml.timesWatched)
        FROM movielist ml
        WHERE ml.timesWatched > 0 
        AND ml.username = '${username}')
	    AND ml.movieID = m.movieID AND ml.username = '${username}'`
    db.query(sqlStatistic, (err, result) => {
        res.send(result)
    })
})
// app.get('/browse/filter/releaseYear/:year', (req, res) => {
//     const searchTerm = req.params.releaseYear;
//     const sqlSearchView =
//         `SELECT DISTINCT releaseYear 
//         FROM picturethis.movie;`
//     db.query(sqlSearchView, (err, result) => {
//         res.send(result)
//     })
// })

// to get a user's actor statitics
app.get('/statistics/actors/:username',(req,res) => {
    const username = req.params.username;
    const sqlStatistic = `SELECT ml.username, cm.castName AS topActor, COUNT(mc.castID1) AS appearances
    FROM movielist ml, movie m
    JOIN moviecast mc ON mc.movieID = m.movieID 
    JOIN castmember cm ON mc.castID1 = cm.castID
    WHERE ml.movieID = m.movieID AND ml.username = '${username}' 
    GROUP BY mc.castID1
    ORDER BY COUNT(mc.castID1) DESC
	LIMIT 1`
    db.query(sqlStatistic, (err, result) => {
        res.send(result)
    })
})

//post a review
app.post("/post", (req, res) => {
    const movieID = req.body.movieIDPost
    const reviewBody = req.body.reviewbody
    const starRating = req.body.ratingbody
    const postDate = req.body.postDate
    const reviewFlag = req.body.reviewFlag
    const ratingFlag = req.body.ratingFlag
    const username = req.body.username;
    
    let query_2 = `INSERT INTO Post(username, movieID, postDate, reviewBody, starRating, reviewFlag, ratingFlag) VALUES (?, ?, ?, ?, ?, ?, ?);`;
    
    db.query(
        query_2,
        [username, movieID, postDate, reviewBody, starRating, reviewFlag, ratingFlag],
        (err, results, fields) => {
            if (err) throw err;
            // results is an array with one element for every statement in the query:
            //console.log(results[0]); // query_1 results
            //console.log(results[1]); // query_2 results
            res.send(results);
        });
});

// to view all reviews of a movie
app.get('/reviews/:movieID',(req,res) => {
    const movieID = req.params.movieID;
    const sqlStatistic = `SELECT * FROM Post WHERE movieID='${movieID}'`
    db.query(sqlStatistic, (err, result) => {
        res.send(result.splice(0,5))
    })
})

app.listen(4200, () => {
    console.log("Backend Running on port 4200")
})
