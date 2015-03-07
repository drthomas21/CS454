var arrayToObject = function(arr) {
	if(!Array.isArray(arr)) {
		return new Error('Argument must be an array');
	}
	var obj = {};
	arr.forEach(function(arg) {
		if(Array.isArray(arg)) {
			obj[toCamelCase(arg[0])] = arg[1];
		}
	});

	return obj;
};

var toCamelCase = function(string) {
	if(typeof(string) !== "string") {
		return new Error('Argument must be a string');
	}
	
	return string.trim().toLowerCase().replace(/[_\s](.)/g,function(match, letter) {
		return letter.toUpperCase();
	});
};

module.exports = {
	arrayToObject: arrayToObject,
	toCamelCase: toCamelCase
};

