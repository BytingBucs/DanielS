var main = function() {
	var message,
		$testResult = $("main .testResult"); //Declares the variable to store the test message in.

	$.post("Test", message, function (result) {
		console.log(result);

		$testResult.append("<p>" + result.message + "</p>");
	});
};

$(document).ready(main);