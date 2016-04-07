var poker = {},
	containsNTimes,
	ranks = ["two","three","four","five","six","seven","eight","nine",
		"ten","jack","queen","king","ace"],
	suits = ["clubs","diamonds","hearts","spades"];

containsNTimes = function (array, string, number) {
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

poker.containsPair = function (hand) {
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
}

//containsTwoPair and containsFullHouse need to be rewritten in the future to identify hands which aren't fed specific values.
poker.containsTwoPair = function (hand, rank1, rank2) {
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
}

poker.containsThreeOfAKind = function (hand) {
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
}

poker.containsStraight = function (hand) {
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

	if ((largest - smallest) === 4 && 
		!(containsPair(hand)) && !(containsThreeOfAKind(hand)) &&
		!(containsFourOfAKind(hand))) {
		result = true;
	}

	return result;
}

poker.containsFlush = function (hand) {
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
}

poker.containsFullHouse = function (hand, rank1, rank2) {
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
}

poker.containsFourOfAKind = function (hand) {
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
}

poker.containsStraightFlush = function (hand) {
	var result = false,
		straight = poker.containsStraight(hand),
		flush = poker.containsFlush(hand);

	if (straight === true && flush === true) {
		result = true;
	}

	return result;
}

poker.containsRoyalFlush = function (hand) {
	var result = false,
		flush = poker.containsFlush(hand),
		handRanks;

	handRanks = hand.map(function (card) {
		return card.rank;
	});

	if ("ten" in hand && "jack" in hand &&
		"queen" in hand && "king" in hand &&
		"ace" in hand && flush === true) {
		result = true;
	}

	return result;
}

//So far this only counts whether 5 cards are in the hand or not.
poker.isValid = function (hand) {
	var cardCount = 0,
		isValid = false;
	hand.forEach(function () {
		cardCount += 1;
	});
	if (cardCount === 5) {
		isValid = true;
	} else {
		isValid = false;
	}
	return isValid;
}

poker.getHand = function (clientHand) {
	return clientHand;
}

module.exports = poker;