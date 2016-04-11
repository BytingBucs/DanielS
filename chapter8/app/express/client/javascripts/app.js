var main = function () {
	"use strict";

	var $input = $("<input>");
	var $button = $("<button>").text("Search");

	$("main").append($input);
	$("main").append($button);

	$button.on("click", function () {
		var term = $input.val();
		var url = "http://api.flickr.com/services/feeds/photos_public.gne?" + 
		"tags=" + term + "&format=json&jsoncallback=?";
		var slides = [];
		$.getJSON(url, function (flickrResponse) {
			flickrResponse.items.forEach(function (photo) {
				slides.push(photo.media.m);
			});
		});
		displaySlides(slides, 0);
	});

	var displaySlides = function (slideArray, slideIndex) {
		$("main .slideshow").empty();
		var $img = $("<img>");
		$img.attr("src", slideArray[slideIndex]);
		$("main .slideshow").append($img);
		$("main .slideshow").fadeIn(3000);
		$("main .slideshow").fadeOut(2000);
		setTimeout(function () {
			slideIndex = slideIndex + 1;
			displaySlides(slideArray, slideIndex);
		}, 5000);
	};
};

$(document).ready(main);