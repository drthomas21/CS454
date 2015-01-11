//Question 1
var reflection = function(string) {
	var response = string + " ";
	for(var index = string.length-1; index >= 0; index--) {
		response += string.charAt(index);
	}
	
	console.log("Question 1: " + response);
};

//Question 2
var pattern = function(start, end, spread) {
	var response = [];
	while(start < end) {
		response.push(start);
		start += spread;
	}
	
	console.log("Question 2: " + response.join(', '));
};

//Question 3
var addAll = function(list) {
	var response = 0;
	list.forEach(function(value) {
		response += value;
	});
	
	console.log("Question 3: " + response);
};

//Question 4

//Question 5

//Question 6

//Question 7
