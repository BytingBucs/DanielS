var main = function () {
	"use strict";

	var toDos = [
		"Finish writing this book",
		"Take Gracie to the park",
		"Answer emails",
		"Prep for Monday's class",
		"Make up some new ToDos",
		"Get Groceries"
	];

	$(".tabs a span").toArray().forEach(function (element) {
		$(element).on("click", function () {
			var $element = $(element), $content;

			$(".tabs a span").removeClass("active");
			$element.addClass("active");
			$("main .content").empty();

			if ($element.parent().is(":nth-child(1)")) {
				$content = $("<ul>");
				for(var index = 0; index < toDos.length; index++) {
					$content.prepend($("<li>").text(toDos[index]));
				}
				$("main .content").append($content);
			} else if ($element.parent().is(":nth-child(2)")) {
				$content = $("<ul>");
				toDos.forEach(function (todo) {
					$content.append($("<li>").text(todo));
				});
				$("main .content").append($content);
			} else if ($element.parent().is(":nth-child(3)")) {
				$content = $("<ul>");
				$content.append($("<section class=input><input type=text><button>+</button>"));
				$("main .content").append($content);
				$(".input button").on("click", function (event) {
					var $newItem = $("<li>").text($(".input input").val());
					$("main .content ul").append($newItem);
				});
			}

			return false;
		});
	});

	

	$(".tabs a:first-child span").trigger("click");
};

$(document).ready(main);