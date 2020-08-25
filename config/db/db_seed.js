const mongoose = require('mongoose');
const axios = require('axios');
const Movie = require('../../server/models/movie.js');

var Search = [];
var promesses = [];
// 1. établir une connection Mongo
mongoose.connect('mongodb://localhost:27017/movie', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('db connected on port 27017');

});

// 2. GET le résultat de la recherche STAR WARS (PROMESSE)

const getMoviesPromesse = new Promise((resolve, reject) => {

    axios.get('http://www.omdbapi.com/?s=star+wars&apikey=b83893b9')
        .then(response => {

            resolve(response.data.Search);
        })
        .catch(error => {
            console.log(error);
        });

});

// 3. JSON ARRAY 

getMoviesPromesse.then((value) => {

	console.log(value)
	// JSON ARRAY FOR EACH :
    value.forEach(function(movieSearch) {

    	// PROMESSE GET DETAIL
        var getDetailpromesse = new Promise((resolve, reject) => {

            axios.get('http://www.omdbapi.com/?i=' + movieSearch.imdbID + '&plot=full&apikey=b83893b9')
                .then(response => {
                	// console.log(response.data)
                	resolve(response.data);
                    
                })
                .catch(error => {
                    console.log(error);
                });

        });
        // PROMESSE RESOLVED
        getDetailpromesse.then(function(movie){
        	console.log("=============final movie value===========")
        	console.log(movie);
        	// MOVIE SAVE IN DB : 
        	var toSave = new Movie(movie);
        	toSave.save().then(function(newMovie){
        		console.log('object Saved with ID: ' + newMovie._id );
        	})
        });
    });

    
    // expected output: "foo"
});


// 4. External function Promesse OR async/await :  GET MOVIE BY ID
// 5.JSON ARRAY FOREACH	
// -> promesse.resolve
// -> return promesse.ALL
// (( OR aWAIT / aSYNC ))
// -> then : save()