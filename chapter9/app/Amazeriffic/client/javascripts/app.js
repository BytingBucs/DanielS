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
				callback($content);
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

				for(var i = toDos.length-1; i >= 0; i--) {
					$content.prepend($("<li>").text(toDos[i])); //Just doing the last function but in reverse since it worked. Otherwise it returns an array of objects.
				}
				callback($content);
			}).fail(function (jqXHR, textStatus, error) {
				callback(error, null);
			});
		}
	});

	tabs.push({
		"name":"Tags",
		"content":function (callback) {
			$.get("todos.json", function (toDoObjects) {
				var	tags = [];

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

					$content.append($tagName); //Moved this because the tags were appearing before the descriptions, not afterwards.
					tag.ToDos.forEach(function (description) {
						var $li = $("<li>").text(description);
						$content.append($li);
					});
					
					callback($content);
				});
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
					$content = $("<p>");

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
				$content.append($inputLabel);
				$content.append($input);
				$content.append($tagLabel);
				$content.append($tagInput);
				$content.append($button);
				console.log($content);
				callback($content);
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
				var err = null; //For some reason err isn't being sent. This is just so I can test the file without it crashing.
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