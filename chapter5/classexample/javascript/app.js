var main = function () {
	"use strict";
	
	var b = {};
	b.name = "Bentley";
	
	console.log(b.name);
	
	b.friends = ["Manuel","Bobby","Carmen","Brad"];
	
	b.age = 119;
	
	console.log(b);
	
	var c = {}
	c.name = "Carl Brandt";
	
	console.log(c.name);
	
	c.friends = [b.name,"Bobby","Carmen","Brad"];
	c.age = 11;
	
	console.log(c);
	for (var i = 0; i < 4; i++) {
		console.log(c.friends[i]);
	}
};

$(document).ready(main);