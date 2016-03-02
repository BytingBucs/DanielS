var main = function (toDoObjects) {
	"use strict";

	var toDos = toDoObjects.map(function(toDo) {
		return toDo.description;
	});
	
	var organizeByTag = function (toDoObjects) {
		var tags = [
			{
				"name" : "shopping",
				"toDos" : ["Get groceries"]
			},

			{
				"name" : "chores",
				"toDos" : ["Get groceries", "Take Gracie to the park"]
			},

			{
				"name" : "writing",
				"toDos" : ["Make up some new toDos", "Finish writing this book"]
			},

			{
				"name" : "work",
				"toDos" : ["Make up some new ToDos", "Prep for Monday's class",
				"Answer emails", "Finish writing this book"]
			},

			{
				"name" : "teaching",
				"toDos" : ["Prep for Monday's class"]
			},
			
			{
				"name" : "pets",
				"toDos" : ["Take Gracie to the park"]
			}
		];

		tags.forEach(function (tag) {
			var $tagName = $("<h3>").text(tag.name), $content = $("<ul>");

			tag.toDos.forEach(function (description) {
				var $li = $("<li>").text(description);
				$content.append($li);
			});
			$("main .content").append($tagName);
			$("main .content").append($content);
		});
	};
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
				var organizedByTag = organizeByTag(toDoObjects);
			} else if ($element.parent().is(":nth-child(4)")) {
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
	$(".tabs a:first-child span").trigger("click");
	});
};

$(document).ready(function() {
	$.getJSON("todos.json", function(toDoObjects) {
		main(toDoObjects);
	});
});