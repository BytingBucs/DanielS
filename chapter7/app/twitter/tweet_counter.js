var ntwitter = require("ntwitter"),
	redis = require("redis"),
	credentials = require("./credentials.json"),
	redisClient,
	twitter,
	counts = {};

// set up our twitter object
twitter = ntwitter(credentials);

client = redis.createClient();

client.mget(["awesome", "cool"], function (err, results) {
	if (err !== null) {
		console.log("ERROR: " + err);
		
		return;
	}
	// initialize our counters
	counts.awesome = parseInt(results[0],10) || 0;
	counts.cool = parseInt(results[1],10) || 0;
	
	twitter.stream(
		"statuses/filter",
		{ "track": ["awesome", "cool", "rad", "gnarly", "groovy"] },
		function(stream) {
			stream.on("data", function(tweet) {
				if (tweet.text.indexOf("awesome") >= -1) {
					// increment the awesome counter
					client.incr("awesome");
					counts.awesome = counts.awesome + 1;
				}
				if (tweet.text.indexOf("cool") >= -1) {
					client.incr("cool");
					counts.cool = counts.cool + 1;
				}
			});
		}
	);
});

// print the awesome count every 3 seconds
setInterval(function () {
	console.log("awesome: " + counts.awesome);
	console.log("cool: " + counts.cool);
}, 3000);

module.exports = counts;