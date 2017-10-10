var userInput = process.argv;
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");
var key = require("./keys.js")
var fs = require("fs");
var dataArray = [];
var liriToDo = "";


//grabs input with spaces
for (i = 3; i < process.argv.length; i++) {
	liriToDo = liriToDo + " " + userInput[i];
}

var liriCommand = userInput[2];

if (liriCommand === "my-tweets") {
	tweets();
} else if (liriCommand === "spotify-this-song") {
	spotify(liriToDo);
} else if (liriCommand === "movie-this") {
	movie(liriToDo);
} else if (liriCommand === "do-what-it-says") {
	dowhat();
}

//movie-this function
function movie(liriToDo) {
	if (liriToDo == "") {
		liriToDo = "Mr. Nobody";
	} 
	var movieName = liriToDo;
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&plot=short&apikey=40e9cece";
	request(queryUrl, function(error, response, body) {
	
	if (!error && response.statusCode === 200) {
		var body = JSON.parse(body);
		console.log("Searching for " + body.Title + ". Here's what I found...");
		console.log(movieName + " was released in " + body.Released + ".");
		console.log(movieName + " received an IMDB rating of " + body.Ratings[0].Value + ".");
		console.log(movieName + " received a Rotten Tomatoes rating of " + body.Ratings[1].Value + ".");
		console.log(movieName + " was produced in " + body.Country + ".");
		console.log("The language for " + movieName + " is " + body.Language + ".");
		console.log("The plot synopsis for " + movieName + " is: " + body.Plot);
		console.log("The main actors for " + movieName + " are " + body.Actors + ".");

		//write log
		fs.appendFile("log.txt", "Searching for " + body.Title + ". Here's what I found...");
		fs.appendFile("log.txt", movieName + " was released in " + body.Released + ".");
		fs.appendFile("log.txt", movieName + " received an IMDB rating of " + body.Ratings[0].Value + ".");
		fs.appendFile("log.txt", movieName + " received a Rotten Tomatoes rating of " + body.Ratings[1].Value + ".");
		fs.appendFile("log.txt", movieName + " was produced in " + body.Country + ".")
		fs.appendFile("log.txt", "The language for " + movieName + " is " + body.Language + ".");
		fs.appendFile("log.txt", "The plot synopsis for " + movieName + " is: " + body.Plot);
		fs.appendFile("log.txt", "The main actors for " + movieName + " are " + body.Actors + ".");
		} else (console.log(error))
	})
}

//spotify-this funciton
function spotify(liriToDo) {
	if (liriToDo == "") {
		liriToDo = "I Saw The Sign";
	}
	var songTitle = liriToDo;
	var spotify = new Spotify({
		id: "630fc259fe3f4fd2a8589b4c5a79f5b3",
		secret: "26cb06d48ed14d0fa2105e3b056a2dba"
	});
	
	spotify.search({type:"track", query: songTitle}, function(err, data) {
		if (err) {
			return console.log("error occured: " + err);
		}
		var song = data.tracks.items;

		for (var j=0; j < song.length; j++){
			console.log("Artist: " + song[j].artists[0].name)
			console.log("Song name: " + song[j].name);
			console.log("Preview URL: " + song[j].preview_url)
			console.log("----------------------------------")

			//write log
			fs.appendFile("log.txt", song[j].artists[0].name);
			fs.appendFile("log.txt", song[j].name);
			fs.appendFile("log.txt", song[j].preview_url);
			fs.appendFile("log.txt", "----------------------------------")
		}
	})
}

//tweet-this function
function tweets() {
	var client = new Twitter(key);
	var params = {screen_name: "nodejs"};
	client.get("statuses/user_timeline", params, function(error, tweets, response) {
		if (error) {
		 	return console.log("error occured: " + error)
		} 
			for (var k=0; k<tweets.length; k++) {
		  	console.log(tweets[k].created_at)
		  	console.log("@nodejs: " + tweets[k].text)
		 	console.log("----------------------------------")

		 	//write log
		 	fs.appendFile("log.txt", tweets[k].created_at);
		 	fs.appendFile("log.txt", "@nodejs: " + tweets[k].text);
		 	fs.appendFile("log.txt", "----------------------------------")
		}
	});
}

//do-what-it-says function
function dowhat() {
	
	fs.readFile("random.txt", "utf8", function(error, data) {
	if (error) {
		return console.log(error);
	}
	dataArray = data.split(",");
	console.log("data array " + dataArray[1])
	spotify(dataArray[1]);
	})
	
}