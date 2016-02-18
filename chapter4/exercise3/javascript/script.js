var main = function () {
	var element;

	var average = function(array) {
		var total = 0;
		var average = 0;
		array.forEach( function (number) {
			total = total + number;
		});
		average = total / 10;
		return average;
	};

	var largestNumber = function (array) {
		var largest = array[0];
		for(var n = 0; n < array.length; n++) {
			if (array[n] > largest) {
				largest = array[n];
			}
		}
		return largest;
	};

	var oneEven = function(array) {
		var oneEven = false;
		array.forEach( function (number) {
			if (number % 2 === 0) {
				oneEven = true;
			}
		});
		return oneEven;
	};

	var allEven = function(array) {
		var allEven = true;
		array.forEach( function (number) {
			if (number % 2 !== 0) {
				allEven = false;
			}
		});
		return allEven;
	};

	var containsString = function (array, string) {
		var contains = false;
		array.forEach( function (value) {
			if (value === string) {
				contains = true;
			}
		});
		return contains;
	};

	var containsMultiple = function (array, string) {
		var multiple = false;
		var count = 0;
		array.forEach( function (value) {
			if (value === string) {
				count = count + 1;
			}
		});
		if (count >= 2) {
			multiple = true;
		}
		return multiple;
	};

	element = average([1,2,3,4,5,6,7,8,9,10]);
	$("main").append(element);
	$("main").append("<p>Largest Number</p>")
	element = largestNumber([1,2,3,4,5,6,7,8,9,10]);
	$("main").append(element);
	$("main").append("<p>At least one even number</p>")
	element = oneEven([1,2,3,4,5,6,7,8,9,10]);
	$("main").append(element);
	element = oneEven([1,3,5,7,9]);
	console.log(element);
	$("main").append("<p>All Even</p>");
	element = allEven([2,4,6,8,10]);
	$("main").append(element);
	element = allEven([1,2,3,4,5,6,7,8,9,10]);
	console.log(element);
	$("main").append("<p>Contains the string at least once</p>")
	element = containsString(["eggman", "walrus"], "walrus");
	$("main").append(element);
	element = containsString(["eggman", "walrus"], "googoogajoob");
	console.log(element);
	$("main").append("<p>Contains the string more than once</p>");
	element = containsMultiple(["eggman", "eggman", "walrus"], "eggman");
	$("main").append(element);
	element = containsMultiple(["eggman", "walrus", "googoogajoob"], "eggman");
	console.log(element);
};

$(document).ready(main);