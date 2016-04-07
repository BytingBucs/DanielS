var main = function() {
	//Our sample hand to be sent to the server. Feel free to mess around with it.
	var hand = [
			{ "rank":"two", "suit":"spades" },
			{ "rank":"four", "suit":"hearts" },
			{ "rank":"two", "suit":"clubs" },
			{ "rank":"king", "suit":"spades" },
			{ "rank":"eight", "suit":"diamonds" }
		];

	$.post("hand", {hand}, function (result) { //Putting hand in curly brackets allows the program to send the object. Without it, it doesn't seem to work...
		console.log(result);
	});
};

$(document).ready(main);