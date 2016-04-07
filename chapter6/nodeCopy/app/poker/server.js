var poker = require("./poker.js"),
	http = require("http"),
	express = require("express"),
	bodyParser = require("body-parser"),
	app = express();
	hand = [];

app.use(express.static(__dirname + "/client"));

//This program likely needs at least one of these statements. Including both to be safe.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

http.createServer(app).listen(3000);

app.get("/hand.json", function (req, res) {
	res.json(hand);
});

app.post("/hand", function (req, res) {
	var result = poker.getHand(req.body.hand);

	console.log(result);

	//To be used in the first if-else structure.
	var hasPair = poker.containsPair(result),
		hasTwoPair = poker.containsTwoPair(result, "two", "eight"),
		hasThreeOfAKind = poker.containsThreeOfAKind(result),
		hasStraight = poker.containsStraight(result),
		hasFlush = poker.containsFlush(result),
		hasFullHouse = poker.containsFullHouse(result, "two", "eight"),
		hasFourOfAKind = poker.containsFourOfAKind(result),
		hasStraightFlush = poker.containsStraightFlush(result),
		hasRoyalFlush = poker.containsRoyalFlush(result),
		bestHand;

	//The following if-else structure iterates from the most valuable hand to the least. In this case the result should give us a pair.
	if (hasRoyalFlush === true) {
		bestHand = [
		{
			"handString":"Royal Flush",
			"errorMessage":null
		}
		];
	} else if (hasStraightFlush === true) {
		bestHand = [
		{
			"handString":"Straight Flush",
			"errorMessage":null
		}
		];
	} else if (hasFourOfAKind === true) {
		bestHand = [
		{
			"handString":"Four of a Kind",
			"errorMessage": null
		}
		];
	} else if (hasFullHouse === true) {
		bestHand = [
		{
			"handString":"Full House",
			"errorMessage":null
		}
		];
	} else if (hasFlush === true) {
		bestHand = [
		{
			"handString":"Flush",
			"errorMessage":null
		}
		];
	} else if (hasStraight === true) {
		bestHand = [
		{
			"handString":"Straight",
			"errorMessage":null
		}
		];
	} else if (hasThreeOfAKind === true) {
		bestHand = [
		{
			"handString":"Three of a Kind",
			"errorMessage":null
		}
		];
	} else if (hasTwoPair === true) {
		bestHand = [
		{
			"handString":"Two Pair",
			"errorMessage":null
		}
		];
	} else if (hasPair === true) {
		bestHand = [
		{
			"handString":"Pair",
			"errorMessage":null
		}
		];
	} else if (poker.isValid(result) === true) {
		bestHand = [
		{
			"handString":"bust",
			"errorMessage":null
		}
		];
	} else {
		bestHand = [
		{
			"handString":null,
			"errorMessage":"That's an invalid poker hand!"
		}
		];
	}

	//The server responds to the client with a different value depending on whether the hand is valid or not.
	if (poker.isValid(result) === true) {
		var messageString = bestHand.map(function(string) {
			return string.handString;
		});
		res.json(messageString);
	} else {
		var errorString = bestHand.map(function(string) {
			return string.errorMessage;
		});
		res.json(errorString);
	}
});