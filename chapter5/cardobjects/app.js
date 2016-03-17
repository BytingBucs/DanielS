var ranks = ["two","three","four","five","six","seven","eight","nine",
	"ten","jack","queen","king","ace"];

var suits = ["clubs","diamonds","hearts","spades"]

//Textbook example of pair.
var hand1 = [
	{ "rank":"two", "suit":"spades" },
	{ "rank":"four", "suit":"hearts" },
	{ "rank":"two", "suit":"clubs" },
	{ "rank":"king", "suit":"spades" },
	{ "rank":"eight", "suit":"diamonds" }
];

//Example for 2 pair.
var hand2 = [
	{ "rank":"two", "suit":"spades" },
	{ "rank":"four", "suit":"hearts" },
	{ "rank":"two", "suit":"clubs" },
	{ "rank":"four", "suit":"spades" },
	{ "rank":"eight", "suit":"diamonds" }
];

//Example for 3 of a kind.
var hand3 = [
	{ "rank":"two", "suit":"spades" },
	{ "rank":"two", "suit":"hearts" },
	{ "rank":"two", "suit":"clubs" },
	{ "rank":"king", "suit":"spades" },
	{ "rank":"eight", "suit":"diamonds" }
];

//Example for a straight.
var hand4 = [
	{ "rank":"three", "suit":"spades" },
	{ "rank":"four", "suit":"hearts" },
	{ "rank":"five", "suit":"clubs" },
	{ "rank":"six", "suit":"spades" },
	{ "rank":"seven", "suit":"diamonds" }
];

//Example for a flush.
var hand5 = [
	{ "rank":"two", "suit":"spades" },
	{ "rank":"four", "suit":"spades" },
	{ "rank":"two", "suit":"spades" },
	{ "rank":"king", "suit":"spades" },
	{ "rank":"eight", "suit":"spades" }
];

//Example of a Full House.
var hand6 = [
	{ "rank":"two", "suit":"spades" },
	{ "rank":"four", "suit":"hearts" },
	{ "rank":"two", "suit":"clubs" },
	{ "rank":"four", "suit":"spades" },
	{ "rank":"four", "suit":"diamonds" }
];

//Example of a Four of a Kind.
var hand7 = [
	{ "rank":"two", "suit":"spades" },
	{ "rank":"two", "suit":"hearts" },
	{ "rank":"two", "suit":"clubs" },
	{ "rank":"king", "suit":"spades" },
	{ "rank":"two", "suit":"diamonds" }
];

//Example of a straight flush.
var hand8 = [
	{ "rank":"two", "suit":"spades" },
	{ "rank":"three", "suit":"spades" },
	{ "rank":"four", "suit":"spades" },
	{ "rank":"five", "suit":"spades" },
	{ "rank":"six", "suit":"spades" }
];

//Example of a Royal Flush.
var hand9 = [
	{ "rank":"ten", "suit":"spades" },
	{ "rank":"jack", "suit":"spades" },
	{ "rank":"queen", "suit":"spades" },
	{ "rank":"king", "suit":"spades" },
	{ "rank":"ace", "suit":"spades" }
];

var containsPair = function (hand) {
	var result = false,
		handRanks;

	handRanks = hand.map(function (card) {
		return card.rank;
	});

	ranks.forEach(function (rank) {
		if (containsNTimes(handRanks, rank, 2)) {
			result = true;
		}
	});

	return result;
};

var containsTwoPair = function (hand, rank1, rank2) {
	var result = false,
		handRanks;

	handRanks = hand.map(function (card) {
		return card.rank;
	});

	ranks.forEach(function (rank) {
		if (containsNTimes(handRanks, rank1, 2) &&
			containsNTimes(handRanks, rank2, 2)) {
			result = true;
		}
	});

	return result;
};

var containsThreeOfAKind = function (hand) {
	var result = false,
		handRanks;

	handRanks = hand.map(function (card) {
		return card.rank;
	});

	ranks.forEach(function (rank) {
		if (containsNTimes(handRanks, rank, 3)) {
			result = true;
		}
	});

	return result;
};

var containsStraight = function (hand) {
	var result = false,
		largest = 0,
		smallest = 12,
		indexNum,
		handRanks;

	handRanks = hand.map(function (card) {
		return card.rank;
	});

	ranks.forEach(function (rank) {
		handRanks.forEach(function (card) {
			if (card === rank) {
				indexNum = ranks.indexOf(rank);
			}
			if (indexNum > largest) {
				largest = indexNum;
			}
		});
	});

	console.log(largest);

	ranks.forEach(function (rank) {
		handRanks.forEach(function (card) {
			if (card === rank) {
				indexNum = ranks.indexOf(rank);
			}
			if (indexNum < smallest) {
				smallest = indexNum;
			}
		});
	});

	console.log(smallest);

	if ((largest - smallest) === 4 && 
		!(containsPair(hand)) && !(containsThreeOfAKind(hand)) &&
		!(containsFourOfAKind(hand))) {
		result = true;
	}

	return result;
};

var containsFlush = function (hand) {
	var result = false,
		handSuits;

	handSuits = hand.map(function (card) {
		return card.suit;
	});

	suits.forEach(function (suit) {
		if (containsNTimes(handSuits, suit, 5)) {
			result = true;
		}
	});

	return result;
};

var containsFullHouse = function (hand, rank1, rank2) {
	var result = false,
		handRanks;

	handRanks = hand.map(function (card) {
		return card.rank;
	});

	ranks.forEach(function (rank) {
		if (containsNTimes(handRanks, rank1, 2) &&
			containsNTimes(handRanks, rank2, 3)) {
			result = true;
		}
	});

	return result;
};

var containsFourOfAKind = function (hand) {
	var result = false,
		handRanks;

	handRanks = hand.map(function (card) {
		return card.rank;
	});

	ranks.forEach(function (rank) {
		if (containsNTimes(handRanks, rank, 4)) {
			result = true;
		}
	});

	return result;
};

var containsStraightFlush = function (hand) {
	var result = false,
		straight = containsStraight(hand),
		flush = containsFlush(hand);

	if (straight === true && flush === true) {
		result = true;
	}

	return result;
};

var containsRoyalFlush = function (hand) {
	var result = false,
		flush = containsFlush(hand),
		handRanks,

	handRanks = hand.map(function (card) {
		return card.rank;
	});

	if (handRanks.includes("ten") && handRanks.includes("jack") &&
		handRanks.includes("queen") && handRanks.includes("king") &&
		handRanks.includes("ace") && flush === true) {
		result = true;
	}

	return result;
}

var containsNTimes = function (array, string, number) {
	var nTimes = false;
	var count = 0;
	array.forEach( function (value) {
		if (value === string) {
			count = count + 1;
		}
	});
	if (count === number) {
		nTimes = true;
	}
	return nTimes;
};

console.log(containsPair(hand1));
console.log(containsTwoPair(hand2, "two", "four"));
console.log(containsThreeOfAKind(hand3));
console.log(containsStraight(hand4));
console.log(containsFlush(hand5));
console.log(containsFullHouse(hand6, "two", "four"));
console.log(containsFourOfAKind(hand7));
console.log(containsStraightFlush(hand8));
console.log(containsRoyalFlush(hand9));