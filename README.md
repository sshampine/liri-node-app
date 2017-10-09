# Liri NodeJS App

The challenge was to create a LIRI bot using NodeJS similar to Apple's Siri. Instead of speach, Liri uses the command line interface that takes in parameters and returns data based on one of four commands:

* my-tweets
* spotify-this-song
* movie-this
* do-what-it says

## How to Use Liri

* Clone the repo.
* Run the command 'npm install' in Terminal or GitBash.
* Run the command 'node liri.js' and one of the commands below.

## Command Overview

1. node liri.js my-tweets

* Displays my last 20 tweets and when they were created.

2. node liri.js spotify-this-song <song name>

* Displays the following information about the song

** Artist(s)
** The song's name
** A preview link of the song
** The album that the song is from

* If no song is specified, it will default to "I Saw The Sign" by Ace of Base

3. node liri.js movie-this <movie name>

* Displays the following information

** Title of the movie
** Year the movie came out
** IMDB rating of the movie
** Rotten Tomatoes rating of the movie
** The country where the movie was produced
** The langague(s) of the movie
** The movie's plot synopsis
** The movie's main cast members

* If no movie is specified, it will default to "Mr. Nobody"

4. node liri.js do-what-it-says

* Takes the text from random.txt and runs the song through the spofity-this-song command

## Technology Used

* Node.js
* Twitter NPM Package
* Spotify NMP Package
* Request NMP Package

## Authors

* Scott Shampine