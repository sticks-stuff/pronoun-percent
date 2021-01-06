require('dotenv').config();

const Twit = require('twit')
const tokens = {
  consumer_key:        process.env.TWITTER_CONSUMER_KEY,
  consumer_secret:     process.env.TWITTER_CONSUMER_SECRET,
  access_token:        process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  //timeout_ms: 60 * 1000
}
 
const getTwitterFollowers = require('get-twitter-followers')

var heHim = [
  "he/him",
  "he / him",
  "he | him",
  "he|him",  
  "him/he",
  "him / he",
  "him | he",
  "him|he",
];

var heThey = [
  "he/they",
  "he / they",
  "he | they",
  "he|they",  
  "they/he",
  "they / he",
  "they | he",
  "they|he",
];

var sheHer = [
  "she/her",
  "she / her",
  "she | her",
  "she|her",  
  "her/she",
  "her / she",
  "her | she",
  "her|she",
];

var sheThey = [
  "she/they",
  "| she/they",
  "she / they",
  "she | they",
  "she|they",  
  "they/she",
  "they / she",
  "they | she",
  "they|she",
];

var theyThem = [
  "they/them",
  "they / them",
  "they | them",
  "they|them",
];

let express = require('express') 
const app = express();
var cors = require('cors')
app.use(cors())

app.get('/api/:username', (req, res) => {
  var apiResponse  = [];
  var heHimCount = [];
  var heTheyCount = [];
  var sheHerCount = [];
  var sheTheyCount = [];
  var theyThemCount = [];
  var nothingCount = [];
  getTwitterFollowers(tokens, req.params.username).then(followers => {
	  for (var i = 0; i < followers.length; i++) {
			var bio = followers[i].description.toLowerCase();
			var location = followers[i].location.toLowerCase();
			
			//this is awful LOL
			if ( heHim.some(substring => (bio.includes(substring) || location.includes(substring))) ) {
				heHimCount.push(
				{
					screen_name: followers[i].screen_name, 
					name: followers[i].name, 
					profile_image_url_https: followers[i].profile_image_url_https.replace("_normal", "_400x400")
				});
			}
			else if ( sheThey.some(substring => (bio.includes(substring) || location.includes(substring))) ) { // checked before he/they so that she/theys don't get mislabeled as he/theys
				sheTheyCount.push(
				{
					screen_name: followers[i].screen_name, 
					name: followers[i].name, 
					profile_image_url_https: followers[i].profile_image_url_https.replace("_normal", "_400x400")
				});
			}
			else if ( heThey.some(substring => (bio.includes(substring) || location.includes(substring))) ) {
				heTheyCount.push(
				{
					screen_name: followers[i].screen_name, 
					name: followers[i].name, 
					profile_image_url_https: followers[i].profile_image_url_https.replace("_normal", "_400x400")
				});
			}
			else if ( sheHer.some(substring => (bio.includes(substring) || location.includes(substring))) ) {
				sheHerCount.push(
				{
					screen_name: followers[i].screen_name, 
					name: followers[i].name, 
					profile_image_url_https: followers[i].profile_image_url_https.replace("_normal", "_400x400")
				});
			}
			else if ( theyThem.some(substring => (bio.includes(substring) || location.includes(substring))) ) {
				theyThemCount.push(
				{
					screen_name: followers[i].screen_name, 
					name: followers[i].name, 
					profile_image_url_https: followers[i].profile_image_url_https.replace("_normal", "_400x400")
				});
			}
			else {
				nothingCount.push(followers[i].screen_name);
			}
			
		}
		console.log(heHimCount.length);
		console.log(heTheyCount.length);
		console.log(sheHerCount.length);
		console.log(sheTheyCount.length);
		console.log(theyThemCount);
		console.log(nothingCount.length);
		apiResponse.push(
		{
			heHim: heHimCount,
			heThey: heTheyCount,
			sheHer: sheHerCount,
			sheThey: sheTheyCount,
			theyThem: theyThemCount,
			nothing: nothingCount,
		});
		return res.send(apiResponse);
	})  
	.catch(error => {
		return res.send(error);
	});
});

app.listen((process.env.PORT || 5000), () =>
  console.log('api listening on port ' + (process.env.PORT || 5000)),
);
