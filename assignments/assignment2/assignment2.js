/**
 * 
 * Question 1
 * 
 */
String.prototype.toCamelCase = function() {
	var camelCase = function(str,char) {
		var parts = str.split(char);
		for(var i = 1; i < parts.length; i++) {
			parts[i] = parts[i].substring(0,1).toUpperCase() + parts[i].substring(1).toLowerCase();
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
};

console.log("Question 1:");
console.log("'hello world' to " + "hello world".toCamelCase());
console.log("'hello_world' to " + "hello_world".toCamelCase());
console.log("'hello-world' to " + "hello-world".toCamelCase());
console.log('');

/**
 * 
 * Question 2
 * 
 */
Array.prototype.convertToObject = function() {
	var object = new Object();
	var that = this;
	
	this.forEach(function(arr) {
		if(arr instanceof Array && arr.length == 2) {
			object[arr[0]] = arr[1];
		} else if(arr instanceof Array && arr.length > 2) {
			var isNumber = true;
			for(var i = 1; i < arr.length; i++) {
				if(isNaN(arr[i])) {
					isNumber = false;
					break;
				}
			}
			
			if(isNumber) {
				var total = 0;
				for(var i = arr.length-1; i > 0; i--) {
					total += arr[i] * (Math.pow(1000,(arr.length-1) - i));
				}
				
				object[arr[0]] = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}
		}
	});
	
	return object;
};

console.log("Question 2:");
console.log("[['media', 'facebook'], ['company', 'github'], ['likes', 48,445]] to " , [['media', 'facebook'], ['company', 'github'], ['likes', 48,445]].convertToObject());
console.log("[['media', 'facebook'], ['company', 'github'], ['likes', 48,445,123]] to " , [['media', 'facebook'], ['company', 'github'], ['likes', 48,445,123]].convertToObject());
console.log("[['media', 'facebook','twitter'], ['company', 'github'], ['likes']] to " , [['media', 'facebook','twitter'], ['company', 'github'], ['likes']].convertToObject());
console.log("[['media', ['facebook','twitter']], ['company', 'github']] to " , [['media', ['facebook','twitter']], ['company', 'github']].convertToObject());
console.log('');

/**
 * 
 * Question 3
 * 
 */
Object.prototype.convertToArray = function() {
	var array = [];
	var that = this;
	Object.keys(this).map(function (key) {
		if(typeof(that[key]) != "function") {
			array.push([key,that[key]]);
		} else {
			array.push([key,that[key]()]);
		}
		
	});
	
	return array;
};

console.log("Question 3:");
console.log("{ media: 'facebook', company: 'github', likes: '48,445' } to " , { media: 'facebook', company: 'github', likes: '48,445' }.convertToArray());
console.log("{ media: ['facebook','twitter'], company: 'github', likes: '48,445' } to " , { media: ['facebook','twitter'], company: 'github', likes: '48,445' }.convertToArray());
console.log("{ media: 'facebook', company: 'github', likes: function() {return 123456;} } to " , { media: 'facebook', company: 'github', likes: function() {return 123456;} }.convertToArray());
console.log("{ media: 'facebook', company: function() { return [1,2,3,4]; }, likes: '48,445' } to " , { media: 'facebook', company: function() { return [1,2,3,4]; }, likes: '48,445' }.convertToArray());
console.log('');

/**
 * 
 * Question 4
 * 
 */
var fruitNinja = function() {
	var score = 0;
	return {
		sliced: function() {
			console.log("Player sliced fruit");
			score++;
		},
		
		missed: function() {
			console.log("Player missed fruit");
			score--;
		},
		
		getScore: function() {
			return score;
		}
	}
}
console.log("Question 4:");
var player = fruitNinja();
console.log("Player score: " + player.getScore());
player.sliced();
player.sliced();
console.log("Player score: " + player.getScore());
player.missed();
player.sliced();
player.sliced();
console.log("Player score: " + player.getScore());
player.missed();
player.missed();
player.missed();
console.log("Player score: " + player.getScore());
console.log('');

/**
 * 
 * Question 5
 * 
 */

/**
 * Shape
 */
var Shape = function(sides){
	this.sides = sides;
	this.validateSides();
};
Shape.prototype.getArea = function() {
	return 0;
};
Shape.prototype.getPerimeter = function() {
	var sum = 0;
	for(var i = 0; i < this.sides.length; i++) {
		sum += this.sides[i];
	}
	
	return sum;
};
Shape.prototype.getSides = function() {
	var str = [];
	for(var i = 0; i < this.sides.length; i++) {
		str.push("Side: " + (i+1) + ", Length: " + this.sides[i]);
	}
	
	return str.join("\r\n");
};
Shape.prototype.validateSides = function() {
	if(!this.sides) {
		return;
	}

	this.sides.forEach(function(number) {
		if(isNaN(number)) {
			console.log(number + " is not a number, please input a number for sides");
		}
	});
}

/**
 * Quadrilateral
 */
var Quadrilateral = function(side1,side2,side3,side4) {
	this.sides = [side1,side2,side3,side4];
	this.sides.sort();
	this.validateSides();
};
Quadrilateral.prototype = new Shape();
Quadrilateral.prototype.getArea = function() {
	//If Square or Rectangle
	if(this.sides[0] == this.sides[1] && this.sides[2] == this.sides[3]) {
		return this.sides[0] * this.sides[2];
	} else {
		return "I do not know the formula for this shape, please build an object for this type of shape";
	}
};

/**
 * Diamond
 */
var Diamond = function(side1,side2,diag1,diag2) {
	this.sides = [side1,side1,side2,side2];
	this.diags = [diag1,diag2];

	this.validateSides();
	
	this.diags.forEach(function(number) {
		if(isNaN(number)) {
			console.log(number + " is not a number, please input a number for sides");
		}
	});
};

Diamond.prototype = new Quadrilateral();
Diamond.prototype.getArea = function() {
	return (this.diags[0] * this.diags[1])/2;
}


console.log("Question 5:");
var shape = new Shape([5,42,1,2]);
console.log("Shape");
console.log(shape.getSides());
console.log("Area of Shape: " + shape.getArea());
console.log("Perimeter of Shape: " + shape.getPerimeter());
console.log('');
var diamond = new Diamond(2,4,3,4);
console.log("Diamond");
console.log(diamond.getSides());
console.log("Area of Diamond: " + diamond.getArea());
console.log("Perimeter of Diamond: " + diamond.getPerimeter());
console.log('');

/**
 * 
 * Question 6
 * 
 */
function isEvenOdd(number,output) {
	if(number == 0) {
		output("Even");
	} else {
		output("Odd");
	}
}

function evenOddMod(number,convert,output) {
	var number = number % 2;
	convert(number,output);
}

function printAnswer(number) {
	evenOddMod(number,isEvenOdd,console.log)
}

console.log("Question 6:");
console.log("Checking 5 -");
printAnswer(5);
console.log("Checking 10 -");
printAnswer(10);
console.log("Checking 1 -");
printAnswer(1);
console.log("Checking 13 -");
printAnswer(13);
console.log("Checking 4 -");
printAnswer(4);
