var main = function() {
	"use strict";

	var insertCountsIntoDOM = function (counts) {
		$("p").text("awesome count: " + counts.awesome)
	};

	setInterval(function () {
		$.getJSON("counts.json", insertCountsIntoDOM);
	}, 5000);
};

$(document).ready(main);