var userInput = process.argv;
var Spotify = require("node-spotify-api");
console.log(userInput);

var liriCommand = userInput[2];
console.log(liriCommand);
var liriToDo = userInput[3];
console.log(liriToDo);

if (liriCommand === "my-tweets") {
	console.log("you selected twitter");
	console.log("last 20 tweets goes here");
} else if (liriCommand === "spotify-this-song") {
	console.log("you selected spotify");
	console.log("info about " + liriToDo + " will go here");
	spotify(liriToDo);
} else if (liriCommand === "movie-this") {
	//console.log("you selected movie");
	//console.log("info about " + liriToDo + " will go here");
	movie(liriToDo);
}


function movie(liriToDo) {
	if (liriToDo == undefined) {
		liriToDo = "Mr. Nobody";
		//console.log("info about " + liriToDo + " will go here");
	} else {
		//console.log("info about " + liriToDo + " will go here");
	}

	var request = require("request");
	var movieName = liriToDo;
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
	//console.log(queryUrl);
	request(queryUrl, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			console.log("Searching for " + JSON.parse(body).Title + ". Here's what I found...");
			console.log(movieName + " was released in " + JSON.parse(body).Released + ".");
			console.log(movieName + " received an IMDB rating of " + JSON.parse(body).Ratings[0].Value + ".");
			console.log(movieName + " received a Rotten Tomatoes rating of " + JSON.parse(body).Ratings[1].Value + ".");
			console.log(movieName + " was produced in " + JSON.parse(body).Country + ".");
			console.log("The language for " + movieName + " is " + JSON.parse(body).Language + ".");
			console.log("The plot synopsis for " + movieName + " is: " + JSON.parse(body).Plot);
			console.log("The main actors for " + movieName + " are " + JSON.parse(body).Actors + ".");
		}
	})
}

function spotify(liriToDo) {
	if (liriToDo == undefined) {
		liriToDo = "I Saw The Sign";
	}

	var songTitle = liriToDo
	console.log(songTitle)
	//var Spotify = require("node-spotify-api");
	var spotify = new Spotify({
		id: "630fc259fe3f4fd2a8589b4c5a79f5b3",
		secret: "26cb06d48ed14d0fa2105e3b056a2dba"
	});
	
	spotify.search({type:"track", query: songTitle}, function(err, data) {
		if (err) {
			return console.log("error occured: " + err);
		}
		var song = data.tracks.items
		for (var j=0; j < song.length; j++){
		//console.log(song[j]);
		console.log("Artist: " + song[j].artists[0].name)
		console.log("Song name: " + song[j].name);
		console.log("Preview URL: " + song[j].preview_url)
		console.log("----------------------------------")
		}
	})
}