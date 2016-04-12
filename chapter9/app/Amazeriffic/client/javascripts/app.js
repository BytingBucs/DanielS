var main = function (toDoObjects) {
	"use strict";
	var toDos,
		tabs;

	toDos = toDoObjects.map(function(toDo) {
		return toDo.description;
	});

	tabs = []; //Tabs will start as an empty array.

	//The following code adds the tabs to the array.
	tabs.push({
		"name":"Newest",
		"content":function () {
			$.get("todos.json", function (toDoObjects) {
				var $content;

				$content = $("<ul>");
				for(i = toDos.length-1; i >= 0; i--) {
					$content.append($("<li>").text(toDos[i]));
				}
				callback($content);
			});
		}
	});

	tabs.push({
		"name":"Oldest",
		"content":function () {
			$.get("todos.json", function (toDoObjects) {
				var $content;
				$content = $("<ul>");
				toDos.forEach(function (todo) {
					$content.append($("<li>").text(todo));
				});
				callback($content);
			});
		}
	});

	tabs.push({
		"name":"Tags",
		"content":function () {
			$.get("todos.json", function (toDoObjects) {
				var $content,
				tags = [];

				toDoObjects.forEach(function (toDo) {
					toDo.tags.forEach(function (tag) {
						if (tags.indexOf(tag) === -1) {
							tags.push(tag);
						}
					});
				});

				var tagObjects = tags.map(function (tag) {
					var toDosWithTag = [];
					
					toDoObjects.forEach(function (toDo) {
						if (toDo.tags.indexOf(tag) !== -1) {
							toDosWithTag.push(toDo.description);
						}
					});

					return {"name": tag, "ToDos": toDosWithTag};		
				});

				tagObjects.forEach(function (tag) {
					var $tagName = $("<h3>").text(tag.name), $content = $("<ul>");

					tag.ToDos.forEach(function (description) {
						var $li = $("<li>").text(description);
						$content.append($li);
					});
					$("main .content").append($tagName);
					$("main .content").append($content);
				});
				callback($content);
			});
		}
	});

	tabs.push({
		"name":"Add",
		"content":function () {
			$.get("todos.json", function (toDoObjects) {
				var $input = $("<input>").addClass("description"),
					$inputLabel = $("<p>").text("Description: "),
					$tagInput = $("<input>").addClass("tags"),
					$tagLabel = $("<p>").text("Tags: "),
					$button = $("<button>").text("+"),
					$content;

				$button.on("click", function () {
					var description = $input.val(),
						tags = $tagInput.val().split(","),
						newToDo = {"description" : description, "tags" : tags};

					$.post("todos", newToDo, function (result) {
						$input.val("");
						$tagInput.val("");

						$(".tabs a:first span").trigger("click");
					});
				});
				$callback($content);
				$("main .content").append($inputLabel).append($input).append($tagLabel);
				$("main .content").append($tagInput).append($button);
			});
		}
	});

	tabs.forEach(function (tab) {
		var $aElement = $("<a>").attr("href",""),
			$spanElement = $("<span>").text(tab.name);

		$aElement.append($spanElement);

		$spanElement.on("click", function () {
			var $content;

			$(".tabs a span").removeClass("active");
			$element.addClass("active");
			$("main .content").empty();

			tab.content(function ($content) {
				$("main .content").append($content);
			});
			return false;
		});
	});
	$(".tabs a:first-child span").trigger("click");
};

$(document).ready(function() {
	$.getJSON("todos.json", function(toDoObjects) {
		main(toDoObjects);
	});
});