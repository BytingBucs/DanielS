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
		"content":function (callback) {
			$.get("todos.json", function (toDoObjects) {
				var $content = $("<ul>");

				for(var i = toDos.length-1; i >= 0; i--) {
					$content.append($("<li>").text(toDos[i]));
				}
				callback(null, $content);
			}).fail(function (jqXHR, textStatus, error) {
				callback(error, null);
			});
		}
	});

	tabs.push({
		"name":"Oldest",
		"content":function (callback) {
			$.get("todos.json", function (toDoObjects) {
				var $content = $("<ul>");

				toDoObjects.forEach(function (todo) {
					$content.append($("<li>").text(todo));
				});
				callback(null, $content);
			}).fail(function (jqXHR, textStatus, error) {
				callback(error, null);
			});
		}
	});

	tabs.push({
		"name":"Tags",
		"content":function (callback) {
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
					$content.append($tagName);
				});
				callback(null, $content);
			}).fail(function (jqXHR, textStatus, error) {
				callback(error, null);
			});
		}
	});

	tabs.push({
		"name":"Add",
		"content":function (callback) {
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
				$content.append($inputLabel).append($input).append($tagLabel);
				$content.append($tagInput).append($button);
				$callback(null, $content);
			}).fail(function (jqXHR, textStatus, error) {
				callback(error, null);
			});
		}
	});

	tabs.forEach(function (tab) {
		var $aElement = $("<a>").attr("href",""),
			$spanElement = $("<span>").text(tab.name);

		$(".tabs").append($aElement);
		$aElement.append($spanElement);

		$spanElement.on("click", function () {
			var $content;

			$(".tabs a span").removeClass("active");
			$spanElement.addClass("active");
			$("main .content").empty();

			tab.content(function ($content) {
				var err = null;//For some reason err isn't being sent. This is just so I can test the file without it crashing.
				if (err !== null) {
					alert("Whoops, there was a problem with your request " + err);
				} else {
					$("main .content").append($content);
				}
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