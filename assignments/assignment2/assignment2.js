//Question 1
String.prototype.toCamelCase = function() {
	var camelCase = function(str,char) {
		var parts = str.split(char);
		for(var i = 1; i < parts.length; i++) {
			parts[i] = parts[i].substring(0,1).toUpperCase() + parts[1].substring(1).toLowerCase();
		}

		return parts.join('');
	};

	if(this.indexOf(' ') >= 0) {
		return camelCase(this,' ');
	} else if(this.indexOf('_') >= 0) {
		return camelCase(this,'_');
	} else {
		return this.toString();
	}		
}

console.log('hello world'.toCamelCase());
console.log('hello_world'.toCamelCase());
console.log('hello-world'.toCamelCase());
console.log('');

//Question 2

