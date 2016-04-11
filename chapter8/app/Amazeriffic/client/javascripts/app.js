var main = function (toDoObjects) {
	"use strict";

	var toDos = toDoObjects.map(function(toDo) {
		return toDo.description;
	});

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
				var tags = [];

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
							toDosWithTag.push(toDo.description)
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
			} else if ($element.parent().is(":nth-child(4)")) {
				var $input = $("<input>").addClass("description"),
					$inputLabel = $("<p>").text("Description: "),
					$tagInput = $("<input>").addClass("tags"),
					$tagLabel = $("<p>").text("Tags: "),
					$button = $("<button>").text("+");

				$button.on("click", function () {
					var description = $input.val(),
						tags = $tagInput.val().split(","),
						newToDo = {"description" : description, "tags" : tags};

					toDoObjects.push({"description" : description, "tags" :tags});

					$.post("todos", newToDo, function (result) {
						console.log(result);

						toDoObjects.push(newToDo);

						toDos = toDoObjects.map(function (toDo) {
							return toDo.description;
						});
					});

					$input.val("");
					$tagInput.val("");
				});
				$("main .content").append($inputLabel).append($input).append($tagLabel)
				$("main .content").append($tagInput).append($button);
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