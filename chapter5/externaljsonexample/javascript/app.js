var main = function () {
	"use strict";
	
	$.getJSON("cards/aceOfSpades.json", function (card) {
		console.log(card);
	});
};

$(document).ready(main);